import { Inject, Injectable } from "@nestjs/common";

import { AuthorizationError, EntityNotFoundError } from "../../common/errors";
import { CrudService } from "../database/common/service/crud.service";
import { Order, OrderType } from "../database/models/order.model";
import { LeagueService } from "../leagues/league.service";

export enum OrdersOrderBy {
  STOCK_KEY = "stock_key",
  CREATED_AT = "created_at"
}

export interface PlaceOrderParams {
  stockSymbol: string;
  stockCount: number;
  stockPriceCents: number;
  type: OrderType;
  expirationDate: string;
}

@Injectable()
export class OrderService extends CrudService<Order, OrdersOrderBy> {
  constructor(@Inject(Order) orderModel: typeof Order, private readonly leagueService: LeagueService) {
    super(orderModel);
  }

  async findMemberOrders(memberId: string) {
    return this.model.query().where({
      memberId
    });
  }

  async placeOrder(userId: string, memberId: string, params: PlaceOrderParams) {
    const member = await this.leagueService.findMemberById(memberId);

    if (member == null) {
      throw new EntityNotFoundError("member", userId);
    }

    if (member.userId != userId) {
      throw new AuthorizationError();
    }

    const order = await super.createAndFetchOne({
      memberId,
      stockSymbol: params.stockSymbol,
      stockCount: params.stockCount,
      stockPriceCents: params.stockPriceCents,
      type: params.type,
      expirationDate: params.expirationDate
    });

    return order;
  }
}
