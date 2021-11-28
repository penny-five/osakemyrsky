import { Firestore } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { Editor } from "../../common/editor";
import { DocumentNotFoundError } from "../../common/errors";
import { Order, orderConverter } from "../firestore/models/order.model";
import { LeagueService } from "../leagues/league.service";

export enum OrdersOrderBy {
  STOCK_KEY = "stock_key",
  CREATED_AT = "created_at"
}

@Injectable()
export class OrderService {
  constructor(private readonly firestore: Firestore, private readonly leagueService: LeagueService) {}

  async findOrderById(orderId: string) {
    const res = await this.firestore
      .collectionGroup("orders")
      .withConverter(orderConverter)
      .where("id", "==", orderId)
      .get();

    return res.size > 0 ? res.docs[0] : undefined;
  }

  async findMemberOrders(memberId: string) {
    const res = await this.firestore
      .collectionGroup("orders")
      .withConverter(orderConverter)
      .where("memberId", "==", memberId)
      .get();

    return res.docs.map(doc => doc.data());
  }

  async placeOrder(
    leagueId: string,
    order: Pick<Order, "stockSymbol" | "stockCount" | "stockPriceCents" | "type" | "expirationDate">,
    editor: Editor
  ) {
    const member = await this.leagueService.findMemberByUserId(leagueId, editor.userId);

    if (member == null) {
      throw new DocumentNotFoundError("member");
    }

    const id = uuid();

    const orderRef = this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .doc(member.id)
      .collection("orders")
      .withConverter(orderConverter)
      .doc(id);

    await orderRef.set({ id, ...order });

    const res = await orderRef.get();
    return res.data();
  }
}
