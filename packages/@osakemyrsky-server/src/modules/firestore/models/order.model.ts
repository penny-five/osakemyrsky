import { DocumentData, FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLPositiveInt } from "graphql-scalars";

import { BaseModel } from "./base";

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

registerEnumType(OrderType, { name: "OrderType" });

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED"
}

registerEnumType(OrderStatus, { name: "OrderStatus" });

@ObjectType()
export class Order extends BaseModel {
  @Field({ nullable: false })
  leagueId!: string;

  @Field({ nullable: false })
  memberId!: string;

  @Field({ nullable: false })
  stockSymbol!: string;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  stockPriceCents!: number;

  @Field(() => String, { nullable: false })
  stockPriceString() {
    return `${(this.stockPriceCents / 100).toFixed(2)} €`;
  }

  @Field(() => GraphQLPositiveInt, { nullable: false })
  stockCount!: number;

  @Field(() => OrderType)
  type!: OrderType;

  @Field(() => OrderStatus)
  status!: OrderStatus;

  @Field(() => GraphQLDate, { nullable: false })
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
