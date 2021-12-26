import { FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";

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

export class OrderMember {
  id!: string;

  userId!: string;

  name!: string;

  picture!: string | null;

  companyName!: string;
}

export class OrderStock {
  name!: string;

  symbol!: string;

  exchangeCountry!: string;
}

export class Order extends BaseModel {
  leagueId!: string;

  member!: OrderMember;

  stock!: OrderStock;

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
    order.member = data.member as OrderMember;
    order.stock = data.stock as OrderStock;
    order.stockPriceCents = data.stockPriceCents as number;
    order.stockCount = data.stockCount as number;
    order.type = data.type as OrderType;
    order.status = data.status as OrderStatus;
    order.expirationDate = formatISODate((data.expirationDate as Timestamp).toDate());

    return order;
  },

  toFirestore: function (order: Order) {
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
