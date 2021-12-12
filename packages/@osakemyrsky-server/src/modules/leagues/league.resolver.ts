import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { League } from "../firestore/models/league.model";
import { Member } from "../firestore/models/member.model";
import { Membership } from "../firestore/models/membership.model";
import { Transaction } from "../firestore/models/transaction.model";
import { TransactionService } from "../transactions/transaction.service";

import { CreateLeagueInput } from "./dto/create-league.input";
import { GetLeaguesArgs } from "./dto/get-leagues.args";
import { JoinLeagueInput } from "./dto/join-league.input";
import { LeagueService } from "./league.service";

@Resolver(() => League)
export class LeagueResolver {
  constructor(private readonly leagueService: LeagueService, private readonly transactionService: TransactionService) {}

  @Query(() => League)
  league(@Args("id") id: string) {
    return this.leagueService.findLeagueById(id);
  }

  @Query(() => [League])
  leagues(@Args() args: GetLeaguesArgs) {
    return this.leagueService.findAll(args.orderBy);
  }

  @ResolveField(() => [Member])
  async members(@Parent() league: League) {
    return this.leagueService.findLeagueMembers(league.id!);
  }

  @ResolveField(() => [Transaction])
  async transactions(@Parent() league: League) {
    return this.transactionService.findLeagueTransactions(league.id!);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => League)
  async createLeague(
    @Token() token: AuthenticationToken,
    @Args("createLeagueInput") createLeagueInput: CreateLeagueInput
  ) {
    return this.leagueService.createLeague(
      {
        name: createLeagueInput.name,
        startDate: createLeagueInput.startDate,
        endDate: createLeagueInput.endDate
      },
      { userId: token.sub }
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Membership)
  async joinLeague(@Token() token: AuthenticationToken, @Args("joinLeagueInput") joinLeagueInput: JoinLeagueInput) {
    return this.leagueService.registerMember(joinLeagueInput.leagueId, token.sub, {
      companyName: joinLeagueInput.companyName
    });
  }
}
