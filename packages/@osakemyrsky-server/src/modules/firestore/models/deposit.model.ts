import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLPositiveInt } from "graphql-scalars";

import { BaseModel } from "./base";

@ObjectType()
export class Deposit extends BaseModel {
  @Field(() => GraphQLPositiveInt, { nullable: false })
  valueCents!: number;
}

export const depositConverter: FirestoreDataConverter<Deposit> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const deposit = new Deposit();

    deposit.id = snapshot.id;
    deposit.createdAt = snapshot.createTime.toDate().toISOString();
    deposit.updatedAt = snapshot.updateTime.toDate().toISOString();
    deposit.valueCents = data.valueCents as number;

    return deposit;
  },

  toFirestore: function (deposit: Deposit): DocumentData {
    return {
      valueCents: deposit.valueCents
    };
  }
};
