import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLPositiveInt } from "graphql-scalars";

export enum StockTradingStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  UNKNOWN = "UNKNOWN"
}

registerEnumType(StockTradingStatus, { name: "StockTradingStatus" });

@ObjectType()
export class Stock {
  @Field()
  name!: string;

  @Field(() => ID)
  symbol!: string;

  @Field()
  exchangeCountry!: string;

  @Field(() => GraphQLPositiveInt, { nullable: true })
  price!: number | null;

  @Field(() => Float, { nullable: true })
  priceDiff!: number | null;

  @Field(() => Float, { nullable: true })
  priceDiffPct!: number | null;

  @Field(() => StockTradingStatus, { nullable: true })
  tradingStatus!: StockTradingStatus | null;
}
