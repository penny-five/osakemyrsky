import { DocumentData, FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED"
}

export class Order extends BaseModel {
  leagueId!: string;

  memberId!: string;

  stockSymbol!: string;

  stockPriceCents!: number;

  stockCount!: number;

  type!: OrderType;

  status!: OrderStatus;

  expirationDate!: string;
}

export const orderConverter: FirestoreDataConverter<Order> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const order = new Order();

    order.id = snapshot.id;
    order.createdAt = snapshot.createTime.toDate().toISOString();
    order.updatedAt = snapshot.updateTime.toDate().toISOString();
    order.leagueId = data.leagueId as string;
    order.memberId = data.memberId as string;
    order.stockSymbol = data.stockSymbol as string;
    order.stockPriceCents = data.stockPriceCents as number;
    order.stockCount = data.stockCount as number;
    order.type = data.type as OrderType;
    order.status = data.status as OrderStatus;
    order.expirationDate = (data.expirationDate as Timestamp).toDate().toISOString();

    return order;
  },

  toFirestore: function (order: Order): DocumentData {
    return {
      id: order.id,
      leagueId: order.leagueId,
      memberId: order.memberId,
      stockSymbol: order.stockSymbol,
      stockPriceCents: order.stockPriceCents,
      stockCount: order.stockCount,
      type: order.type,
      status: order.status,
      expirationDate: order.expirationDate
    };
  }
};
