import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLUUID, GraphQLPositiveInt } from "graphql-scalars";

import { BaseModel } from "./base/base.model";
import { Member } from "./member.model";

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

registerEnumType(OrderType, { name: "OrderType" });

@ObjectType()
export class Order extends BaseModel {
  static tableName = "order";

  @Field(() => GraphQLUUID, { nullable: false })
  readonly id!: string;

  memberId!: string;

  @Field({ nullable: false })
  member!: Member;

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

  static relationMappings = {
    member: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "member.model",
      join: {
        from: "order.memberId",
        to: "member.id"
      }
    }
  };
}
