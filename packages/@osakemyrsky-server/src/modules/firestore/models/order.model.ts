import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLPositiveInt } from "graphql-scalars";

import { BaseModel } from "./base";

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

registerEnumType(OrderType, { name: "OrderType" });

@ObjectType()
export class Order extends BaseModel {
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

  @Field(() => GraphQLDate, { nullable: false })
  expirationDate!: string;
}

export const orderConverter: FirestoreDataConverter<Omit<Order, "stockPriceString">> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const order = new Order();

    order.id = snapshot.id;
    order.createdAt = snapshot.createTime.toDate().toISOString();
    order.updatedAt = snapshot.updateTime.toDate().toISOString();
    order.stockSymbol = data.stockSymbol as string;
    order.stockPriceCents = data.stockPriceCents as number;
    order.stockCount = data.stockCount as number;
    order.type = data.type as OrderType;
    order.expirationDate = data.expirationDate as string;

    return order;
  },

  toFirestore: function (order: Order): DocumentData {
    return {
      id: order.id,
      stockSymbol: order.stockSymbol,
      stockPriceCents: order.stockPriceCents,
      stockCount: order.stockCount,
      type: order.type,
      expirationDate: order.expirationDate
    };
  }
};
