import { DocumentData, FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";

import { formatISODate } from "../../../utils/dates";

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
    userId: string;
    name: string;
    picture: string | null;
    companyName: string;
  };

  stock!: {
    name: string;
    symbol: string;
    exchangeCountry: string;
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
      userId: (data.member as DocumentData).userId as string,
      name: (data.member as DocumentData).name as string,
      picture: (data.member as DocumentData).picture as string,
      companyName: (data.member as DocumentData).companyName as string
    };
    order.stock = {
      name: (data.stock as DocumentData).name as string,
      symbol: (data.stock as DocumentData).symbol as string,
      exchangeCountry: (data.stock as DocumentData).exchangeCountry as string
    };
    order.stockPriceCents = data.stockPriceCents as number;
    order.stockCount = data.stockCount as number;
    order.type = data.type as OrderType;
    order.status = data.status as OrderStatus;
    order.expirationDate = formatISODate((data.expirationDate as Timestamp).toDate());

    return order;
  },

  toFirestore: function (order: Order): DocumentData {
    return {
      id: order.id,
      leagueId: order.leagueId,
      member: {
        id: order.member.id,
        userId: order.member.userId,
        name: order.member.name,
        picture: order.member.picture,
        companyName: order.member.companyName
      },
      stock: {
        name: order.stock.name,
        symbol: order.stock.symbol,
        exchangeCountry: order.stock.exchangeCountry
      },
      stockPriceCents: order.stockPriceCents,
      stockCount: order.stockCount,
      type: order.type,
      status: order.status,
      expirationDate: order.expirationDate
    };
  }
};
