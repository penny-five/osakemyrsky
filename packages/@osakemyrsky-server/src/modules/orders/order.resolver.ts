import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { Order } from "../firestore/models/order.model";

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
    return this.orderService.findOrderById(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order)
  placeOrder(@Token() token: AuthenticationToken, @Args("placeOrderInput") placeOrderInput: PlaceOrderInput) {
    return this.orderService.placeOrder(
      placeOrderInput.leagueId,
      {
        expirationDate: placeOrderInput.expirationDate,
        stockCount: placeOrderInput.stockCount,
        stockPriceCents: placeOrderInput.stockPriceCents,
        stockSymbol: placeOrderInput.stockSymbol,
        type: placeOrderInput.type
      },
      { userId: token.sub }
    );
  }
}
