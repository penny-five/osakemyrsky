import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { Order } from "../database/models/order.model";

import { PlaceOrderInput } from "./dto/place-order.input";
import { OrderService } from "./order.service";

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  orders(@Args("memberId") memberId: string) {
    return this.orderService.findMemberOrders(memberId);
  }

  @Query(() => Order)
  order(@Args("id") id: string) {
    return this.orderService.findById(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order)
  async placeOrder(@Token() token: AuthenticationToken, @Args("placeOrderInput") placeOrderInput: PlaceOrderInput) {
    return this.orderService.placeOrder(token.sub, placeOrderInput.memberId, placeOrderInput);
  }
}
