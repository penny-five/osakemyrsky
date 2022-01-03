import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLFloat } from "graphql";

export enum StockTradingStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  UNKNOWN = "UNKNOWN"
}

registerEnumType(StockTradingStatus, { name: "StockTradingStatus" });

@ObjectType("Stock")
export class Stock {
  @Field()
  name!: string;

  @Field(() => ID)
  symbol!: string;

  @Field()
  exchangeCountry!: string;

  @Field(() => GraphQLFloat, { nullable: true })
  priceCents!: number | null;

  @Field(() => Float, { nullable: true })
  priceDiffCents!: number | null;

  @Field(() => Float, { nullable: true })
  priceDiffPct!: number | null;

  @Field(() => StockTradingStatus, { nullable: true })
  tradingStatus!: StockTradingStatus | null;
}
