import { Firestore } from "@google-cloud/firestore";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { Editor } from "../../common/editor";
import { DocumentNotFoundError } from "../../common/errors";
import { isBefore, isSameDay } from "../../utils/dates";
import { Order, orderConverter, OrderStatus, OrderType } from "../firestore/models/order.model";
import { TransactionType } from "../firestore/models/transaction.model";
import { LeagueService } from "../leagues/league.service";
import { NordnetClient } from "../nordnet/client";
import { NordnetInstrument } from "../nordnet/client/types";
import { StockService } from "../stocks/stock.service";
import { TransactionService } from "../transactions/transaction.service";

export enum OrdersOrderBy {
  STOCK_KEY = "stock_key",
  CREATED_AT = "created_at"
}

export interface PlaceOrderParams {
  leagueId: string;
  stockSymbol: string;
  stockCount: number;
  stockPriceCents: number;
  orderType: OrderType;
  expirationDate: string;
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly firestore: Firestore,
    private readonly leagueService: LeagueService,
    private readonly transactionService: TransactionService,
    private readonly nordnetClient: NordnetClient,
    private readonly stockService: StockService
  ) {}

  async findOrderById(orderId: string) {
    const res = await this.firestore
      .collectionGroup("orders")
      .withConverter(orderConverter)
      .where("id", "==", orderId)
      .get();

    return res.size > 0 ? res.docs[0].data() : undefined;
  }

  async findMemberOrders(memberId: string) {
    const res = await this.firestore
      .collectionGroup("orders")
      .withConverter(orderConverter)
      .where("memberId", "==", memberId)
      .get();

    return res.docs.map(doc => doc.data());
  }

  async placeOrder(params: PlaceOrderParams, editor: Editor) {
    const member = await this.leagueService.findMemberByUserId(params.leagueId, editor.userId);

    if (member == null) {
      throw new DocumentNotFoundError("member");
    }

    if (editor != null && editor.userId != member.userId) {
      throw new UnauthorizedException();
    }

    const stock = await this.stockService.findStockBySymbol(params.stockSymbol);

    if (stock == null) {
      throw new Error("Unsupported stock");
    }

    const id = uuid();

    const orderRef = this.firestore
      .collection("leagues")
      .doc(params.leagueId)
      .collection("members")
      .doc(member.id!)
      .collection("orders")
      .withConverter(orderConverter)
      .doc(id);

    await orderRef.set({
      id,
      leagueId: params.leagueId,
      member: {
        id: member.id!,
        name: member.name,
        picture: member.picture
      },
      stock: {
        name: stock.name,
        symbol: stock.symbol
      },
      stockPriceCents: params.stockPriceCents,
      stockCount: params.stockCount,
      type: params.orderType,
      status: OrderStatus.PENDING,
      expirationDate: params.expirationDate
    });

    const res = await orderRef.get();

    this.logger.log(
      {
        order: res.data()
      },
      "Order placed"
    );

    return res.data()!;
  }

  async processOrders() {
    const taskId = uuid();

    this.logger.log(
      {
        taskId
      },
      "Start order processing"
    );

    const pendingOrdersRes = await this.firestore
      .collectionGroup("orders")
      .withConverter(orderConverter)
      .where("status", "==", OrderStatus.PENDING)
      .get();

    const activeOrdersSnapshot: FirebaseFirestore.QueryDocumentSnapshot<Order>[] = [];
    const expiredOrdersSnapshot: FirebaseFirestore.QueryDocumentSnapshot<Order>[] = [];

    for (const doc of pendingOrdersRes.docs) {
      const order = doc.data();
      const now = new Date();

      const isExpired = isBefore(order.expirationDate, now) && !isSameDay(order.expirationDate, now);

      if (isExpired) {
        expiredOrdersSnapshot.push(doc);
      } else {
        activeOrdersSnapshot.push(doc);
      }
    }

    await Promise.all(
      expiredOrdersSnapshot.map(async doc => {
        await doc.ref.update({
          status: OrderStatus.EXPIRED
        });

        this.logger.log(
          {
            order: doc.data()
          },
          "Order expired"
        );
      })
    );

    const instrumentsBySymbol: Record<string, NordnetInstrument | undefined> = {};

    for (const doc of activeOrdersSnapshot) {
      const order = doc.data();

      if (instrumentsBySymbol[order.stock.symbol] == null) {
        const instrument = await this.nordnetClient.findInstrumentBySymbol(order.stock.symbol);
        instrumentsBySymbol[order.stock.symbol] = instrument;
      }
    }

    for (const doc of activeOrdersSnapshot) {
      const order = doc.data();
      const instrument = instrumentsBySymbol[order.stock.symbol];

      if (instrument != null) {
        switch (order.type) {
          case OrderType.BUY:
            await this.processBuyOrder(doc, instrument);
            break;
          case OrderType.SELL:
            await this.processSellOrder(doc, instrument);
            break;
        }
      } else {
        this.logger.warn({ stock: order.stock }, "Could not find instrument information");
      }
    }

    this.logger.log(
      {
        taskId
      },
      "End order processing"
    );
  }

  private async processBuyOrder(doc: FirebaseFirestore.QueryDocumentSnapshot<Order>, instrument: NordnetInstrument) {
    const order = doc.data();
    const instrumentPriceCents = (instrument.price_info.last.price || instrument.price_info.close.price) * 100;

    if (instrumentPriceCents <= order.stockPriceCents) {
      const currentCashCents = await this.leagueService.getMemberCurrentCashAmount(order.leagueId, order.member.id);

      if (currentCashCents >= order.stockPriceCents * order.stockCount) {
        await this.transactionService.commitTransaction({
          leagueId: order.leagueId,
          member: {
            id: order.member.id,
            name: order.member.name,
            picture: order.member.picture
          },
          stock: {
            name: order.stock.name,
            symbol: order.stock.symbol
          },
          count: order.stockCount,
          priceCents: order.stockPriceCents,
          type: TransactionType.BUY
        });

        await doc.ref.update({
          status: OrderStatus.COMPLETED
        });

        this.logger.log(
          {
            order
          },
          "Buy order completed"
        );
      } else {
        await doc.ref.update({
          status: OrderStatus.FAILED
        });

        this.logger.log(
          {
            order
          },
          "Buy order failed"
        );
      }
    }
  }

  private async processSellOrder(doc: FirebaseFirestore.QueryDocumentSnapshot<Order>, instrument: NordnetInstrument) {
    const order = doc.data();
    const instrumentPriceCents = (instrument.price_info.last.price || instrument.price_info.close.price) * 100;

    if (instrumentPriceCents >= order.stockPriceCents) {
      await this.transactionService.commitTransaction({
        leagueId: order.leagueId,
        member: {
          id: order.member.id,
          name: order.member.name,
          picture: order.member.picture
        },
        stock: {
          name: order.stock.name,
          symbol: order.stock.symbol
        },
        count: order.stockCount,
        priceCents: order.stockPriceCents,
        type: TransactionType.SELL
      });

      await doc.ref.update({
        status: OrderStatus.COMPLETED
      });

      this.logger.log(
        {
          order
        },
        "Sell order completed"
      );
    }
  }
}
