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

  member!: {
    id: string;
    name: string;
    picture: string | null;
  };

  stock!: {
    name: string;
    symbol: string;
  };

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
    order.member = {
      id: (data.member as DocumentData).id as string,
      name: (data.member as DocumentData).id as string,
      picture: (data.member as DocumentData).name as string
    };
    order.stock = {
      name: (data.stock as DocumentData).name as string,
      symbol: (data.stock as DocumentData).symbol as string
    };
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
      member: {
        id: order.member.id,
        name: order.member.name,
        picture: order.member.picture
      },
      stock: {
        name: order.stock.name,
        symbol: order.stock.symbol
      },
      stockPriceCents: order.stockPriceCents,
      stockCount: order.stockCount,
      type: order.type,
      status: order.status,
      expirationDate: order.expirationDate
    };
  }
};
