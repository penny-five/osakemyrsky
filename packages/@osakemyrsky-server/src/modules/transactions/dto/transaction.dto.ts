import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDateTime, GraphQLPositiveInt, GraphQLUUID } from "graphql-scalars";

import { Transaction } from "../../firestore/models/transaction.model";
import { TransactionType } from "../transaction.service";

registerEnumType(TransactionType, { name: "TransactionType" });

@ObjectType("Transaction")
export class TransactionDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  leagueId!: string;

  @Field({ nullable: false })
  memberId!: string;

  @Field(() => TransactionType, { nullable: false })
  type!: TransactionType;

  @Field(() => String, { nullable: false })
  stockSymbol!: string;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  count!: number;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  priceCents!: number;

  static fromModel(model: Transaction) {
    const dto = new TransactionDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.leagueId = model.leagueId;
    dto.memberId = model.memberId;
    dto.type = model.type;
    dto.stockSymbol = model.stockSymbol;
    dto.count = model.count;
    dto.priceCents = model.priceCents;
    return dto;
  }
}
