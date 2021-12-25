import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDateTime, GraphQLPositiveInt, GraphQLUUID } from "graphql-scalars";

import { Transaction, TransactionType } from "../../firestore/models/transaction.model";

registerEnumType(TransactionType, { name: "TransactionType" });

@ObjectType("TransactionMember")
export class TransactionMemberDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLUUID, { nullable: false })
  userId!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;

  @Field(() => String, { nullable: true })
  companyName!: string | null;
}

@ObjectType("TransactionStock")
export class TransactionStockDto {
  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  symbol!: string;

  @Field(() => String, { nullable: false })
  exchangeCountry!: string;
}

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
  member!: TransactionMemberDto;

  @Field({ nullable: false })
  stock!: TransactionStockDto;

  @Field(() => TransactionType, { nullable: false })
  type!: TransactionType;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  count!: number;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  unitPriceCents!: number;

  static fromModel(model: Transaction) {
    const dto = new TransactionDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.leagueId = model.leagueId;
    dto.member = new TransactionMemberDto();
    dto.member.id = model.member.id;
    dto.member.userId = model.member.userId;
    dto.member.name = model.member.name;
    dto.member.picture = model.member.picture;
    dto.member.companyName = model.member.companyName;
    dto.stock = new TransactionStockDto();
    dto.stock.name = model.stock.name;
    dto.stock.symbol = model.stock.symbol;
    dto.stock.exchangeCountry = model.stock.exchangeCountry;
    dto.type = model.type;
    dto.count = model.count;
    dto.unitPriceCents = model.unitPriceCents;
    return dto;
  }
}
