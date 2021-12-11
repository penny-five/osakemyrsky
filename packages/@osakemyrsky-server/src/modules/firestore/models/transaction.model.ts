import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLPositiveInt } from "graphql-scalars";

import { BaseModel } from "./base";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

registerEnumType(TransactionType, { name: "TransactionType" });

@ObjectType()
export class Transaction extends BaseModel {
  @Field(() => TransactionType, { nullable: false })
  type!: TransactionType;

  @Field(() => String, { nullable: false })
  stockSymbol!: string;

  @Field(() => () => GraphQLPositiveInt, { nullable: false })
  count!: number;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  priceCents!: number;
}

export const transactionConverter: FirestoreDataConverter<Transaction> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const transaction = new Transaction();

    transaction.id = snapshot.id;
    transaction.createdAt = snapshot.createTime.toDate().toISOString();
    transaction.updatedAt = snapshot.updateTime.toDate().toISOString();
    transaction.type = data.type as TransactionType;
    transaction.stockSymbol = data.symbol as string;
    transaction.priceCents = data.priceCents as number;

    return transaction;
  },

  toFirestore: function (transaction: Transaction): DocumentData {
    return {
      type: transaction.type,
      stockSymbol: transaction.stockSymbol,
      priceCents: transaction.priceCents
    };
  }
};
