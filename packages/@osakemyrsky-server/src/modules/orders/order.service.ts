import { Firestore } from "@google-cloud/firestore";
import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { Editor } from "../../common/editor";
import { AuthorizationError, LeagueInactiveError, UnsupportedStockError } from "../../common/errors";
import { isBefore, isSameDay } from "../../utils/dates";
import { Order, orderConverter, OrderStatus, OrderType } from "../firestore/models/order.model";
import { TransactionType } from "../firestore/models/transaction.model";
import { LeagueService } from "../leagues/league.service";
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

export enum OrderProcessingResult {
  COMPLETED = "completed",
  FAILED = "failed",
  SKIPPED = "skipped"
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly firestore: Firestore,
    private readonly leagueService: LeagueService,
    private readonly transactionService: TransactionService,
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
    const isLeagueOngoing = await this.leagueService.isLeagueOngoing(params.leagueId);

    if (!isLeagueOngoing) {
      throw new LeagueInactiveError();
    }

    const member = await this.leagueService.findMemberByUserId(params.leagueId, editor.userId);

    if (member == null) {
      throw new AuthorizationError("User not league member");
    }

    const stock = await this.stockService.findStockBySymbol(params.stockSymbol);

    if (stock == null) {
      throw new UnsupportedStockError(params.stockSymbol);
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
        userId: member.userId,
        name: member.name,
        picture: member.picture,
        companyName: member.companyName
      },
      stock: {
        name: stock.name,
        symbol: stock.symbol,
        exchangeCountry: stock.exchangeCountry
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

    const { docs: ordersSnapshot } = await this.firestore
      .collectionGroup("orders")
      .withConverter(orderConverter)
      .where("status", "==", OrderStatus.PENDING)
      .get();

    const activeOrdersSnapshot: FirebaseFirestore.QueryDocumentSnapshot<Order>[] = [];
    const expiredOrdersSnapshot: FirebaseFirestore.QueryDocumentSnapshot<Order>[] = [];

    for (const doc of ordersSnapshot) {
      if (this.isExpired(doc.data())) {
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

    for (const doc of activeOrdersSnapshot) {
      const order = doc.data();

      let result: OrderProcessingResult;

      switch (order.type) {
        case OrderType.BUY:
          result = await this.processBuyOrder(order);
          break;
        case OrderType.SELL:
          result = await this.processSellOrder(order);
          break;
      }

      switch (result) {
        case OrderProcessingResult.COMPLETED:
          await doc.ref.update({
            status: OrderStatus.COMPLETED
          });

          await this.leagueService.refreshMemberBalance(order.leagueId, order.member.id);

          this.logger.log(
            {
              order
            },
            "Order completed"
          );

          break;
        case OrderProcessingResult.FAILED:
          await doc.ref.update({
            status: OrderStatus.FAILED
          });

          this.logger.log(
            {
              order
            },
            "Order failed"
          );

          break;
        default:
          break;
      }
    }

    this.logger.log(
      {
        taskId
      },
      "End order processing"
    );
  }

  private async processBuyOrder(order: Order): Promise<OrderProcessingResult> {
    const stock = await this.stockService.findStockBySymbol(order.stock.symbol);

    if (stock == null) {
      this.logger.warn({ stock: order.stock }, "Could not find instrument information");
      return OrderProcessingResult.SKIPPED;
    }

    if (stock.priceCents == null) {
      this.logger.warn({ stock }, "Could not find instrument price information");
      return OrderProcessingResult.SKIPPED;
    }

    if (stock.priceCents <= order.stockPriceCents) {
      const currentCashCents = await this.leagueService.getMemberCurrentCashAmount(order.leagueId, order.member.id);

      if (currentCashCents >= order.stockPriceCents * order.stockCount) {
        await this.transactionService.commitTransaction({
          order,
          unitPriceCents: stock.priceCents,
          type: TransactionType.BUY
        });

        return OrderProcessingResult.COMPLETED;
      } else {
        return OrderProcessingResult.FAILED;
      }
    }

    return OrderProcessingResult.SKIPPED;
  }

  private async processSellOrder(order: Order): Promise<OrderProcessingResult> {
    const stock = await this.stockService.findStockBySymbol(order.stock.symbol);

    if (stock == null) {
      this.logger.warn({ stock: order.stock }, "Could not find instrument information");
      return OrderProcessingResult.SKIPPED;
    }

    if (stock.priceCents == null) {
      this.logger.warn({ stock }, "Could not find instrument price information");
      return OrderProcessingResult.SKIPPED;
    }

    if (stock.priceCents >= order.stockPriceCents) {
      await this.transactionService.commitTransaction({
        order,
        unitPriceCents: stock.priceCents,
        type: TransactionType.SELL
      });

      return OrderProcessingResult.COMPLETED;
    }

    return OrderProcessingResult.SKIPPED;
  }

  private isExpired(order: Order) {
    const now = new Date();
    return isBefore(order.expirationDate, now) && !isSameDay(order.expirationDate, now);
  }
}
