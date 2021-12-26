import { Field, ID, ObjectType } from "@nestjs/graphql";
import { GraphQLPositiveInt } from "graphql-scalars";

import { MemberStockSnapshot } from "../../transactions/transaction.service";

@ObjectType("MemberStock")
export class MemberStockDto {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ID, { nullable: false })
  symbol!: string;

  @Field(() => String, { nullable: false })
  exchangeCountry!: string;

  @Field(() => Number, { nullable: false })
  priceCents!: number;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  count!: number;

  static fromSnapshot(snapshot: MemberStockSnapshot) {
    const dto = new MemberStockDto();
    dto.name = snapshot.stock.name;
    dto.symbol = snapshot.stock.symbol;
    dto.exchangeCountry = snapshot.stock.exchangeCountry;
    dto.priceCents = snapshot.stock.priceCents;
    dto.count = snapshot.count;
    return dto;
  }
}
