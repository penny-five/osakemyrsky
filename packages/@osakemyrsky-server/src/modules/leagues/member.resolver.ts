import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { DocumentNotFoundError } from "../../common/errors";
import { OrderDto } from "../orders/dto/order.dto";
import { OrderService } from "../orders/order.service";
import { TransactionService } from "../transactions/transaction.service";

import { MemberStockDto } from "./dto/member-stock.dto";
import { MemberDto } from "./dto/member.dto";
import { LeagueService } from "./league.service";

@Resolver(() => MemberDto)
export class MemberResolver {
  constructor(
    private readonly leagueService: LeagueService,
    private readonly orderService: OrderService,
    private readonly transactionService: TransactionService
  ) {}

  @Query(() => MemberDto)
  async member(@Args("leagueId") leagueId: string, @Args("memberId") memberId: string) {
    const member = await this.leagueService.findMemberById(leagueId, memberId);

    if (member == null) {
      throw new DocumentNotFoundError("member", memberId);
    }

    return MemberDto.fromModel(member);
  }

  @ResolveField(() => [OrderDto], { name: "orders" })
  async memberOrders(@Parent() member: MemberDto) {
    const orders = await this.orderService.findMemberOrders(member.id);
    return orders.map(order => OrderDto.fromModel(order));
  }

  @ResolveField(() => [MemberStockDto], { name: "stocks" })
  async memberStocks(@Parent() member: MemberDto) {
    const stocks = await this.transactionService.getMemberStocks(member.league.id, member.id);
    return stocks.map(snapshot => MemberStockDto.fromSnapshot(snapshot));
  }
}
