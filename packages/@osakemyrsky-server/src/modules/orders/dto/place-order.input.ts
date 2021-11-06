import { Field, InputType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLUUID, GraphQLPositiveInt } from "graphql-scalars";

import { OrderType } from "../../database/models/order.model";

@InputType()
export class PlaceOrderInput {
  @Field(() => GraphQLUUID, { nullable: false })
  memberId!: string;

  @Field({ nullable: false })
  stockSymbol!: string;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  stockCount!: number;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  stockPriceCents!: number;

  @Field(() => OrderType, { nullable: false })
  type!: OrderType;

  @Field(() => GraphQLDate, { nullable: false })
  expirationDate!: string;
}
