import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLDateTime, GraphQLPositiveInt, GraphQLUUID } from "graphql-scalars";

import { Order, OrderStatus, OrderType } from "../../firestore/models/order.model";

registerEnumType(OrderType, { name: "OrderType" });
registerEnumType(OrderStatus, { name: "OrderStatus" });

@ObjectType("OrderMember")
export class OrderMemberDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;
}

@ObjectType("OrderStock")
export class OrderStockDto {
  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  symbol!: string;
}

@ObjectType("Order")
export class OrderDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  leagueId!: string;

  @Field(() => OrderMemberDto, { nullable: false })
  member!: OrderMemberDto;

  @Field({ nullable: false })
  memberId!: string;

  @Field(() => OrderStockDto, { nullable: false })
  stock!: OrderStockDto;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  stockPriceCents!: number;

  @Field(() => String, { nullable: false })
  stockPriceString!: string;

  @Field(() => GraphQLPositiveInt, { nullable: false })
  stockCount!: number;

  @Field(() => OrderType)
  type!: OrderType;

  @Field(() => OrderStatus)
  status!: OrderStatus;

  @Field(() => GraphQLDate, { nullable: false })
  expirationDate!: string;

  static fromModel(model: Order) {
    const dto = new OrderDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.leagueId = model.leagueId;
    dto.member = new OrderMemberDto();
    dto.member.id = model.member.id;
    dto.member.name = model.member.name;
    dto.member.picture = model.member.picture;
    dto.stock = new OrderStockDto();
    dto.stock.name = model.stock.name;
    dto.stock.symbol = model.stock.symbol;
    dto.stockPriceCents = model.stockPriceCents;
    dto.stockPriceString = `${(model.stockPriceCents / 100).toFixed(2)} €`;
    dto.stockCount = model.stockCount;
    dto.status = model.status;
    dto.type = model.type;
    dto.expirationDate = model.expirationDate;
    return dto;
  }
}
