import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";

import { DocumentNotFoundError } from "../../common/errors";
import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";

import { OrderDto } from "./dto/order.dto";
import { PlaceOrderInput } from "./dto/place-order.input";
import { OrderService } from "./order.service";

@Resolver(() => OrderDto)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderDto])
  async orders(@Args("memberId") memberId: string) {
    const orders = await this.orderService.findMemberOrders(memberId);
    return orders.map(order => OrderDto.fromModel(order));
  }

  @Query(() => OrderDto)
  async order(@Args("id") id: string) {
    const order = await this.orderService.findOrderById(id);

    if (order == null) {
      throw new DocumentNotFoundError("order", id);
    }

    return OrderDto.fromModel(order);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => OrderDto)
  async placeOrder(@Token() token: AuthenticationToken, @Args("placeOrderInput") placeOrderInput: PlaceOrderInput) {
    const order = await this.orderService.placeOrder(
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

    return OrderDto.fromModel(order);
  }
}
