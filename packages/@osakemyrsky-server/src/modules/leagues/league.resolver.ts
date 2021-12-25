import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { DocumentNotFoundError } from "../../common/errors";
import { Session } from "../authentication/decorators/session.decorator";
import { GqlUserAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { SessionToken } from "../authentication/token.service";
import { TransactionDto } from "../transactions/dto/transaction.dto";
import { TransactionService } from "../transactions/transaction.service";

import { CreateLeagueInput } from "./dto/create-league.input";
import { GetLeaguesArgs } from "./dto/get-leagues.args";
import { JoinLeagueInput } from "./dto/join-league.input";
import { LeagueDto } from "./dto/league.dto";
import { MemberDto } from "./dto/member.dto";
import { MembershipDto } from "./dto/membership.dto";
import { LeagueService } from "./league.service";

@Resolver(() => LeagueDto)
export class LeagueResolver {
  constructor(private readonly leagueService: LeagueService, private readonly transactionService: TransactionService) {}

  @Query(() => LeagueDto)
  async league(@Args("id") id: string) {
    const league = await this.leagueService.findLeagueById(id);

    if (league == null) {
      throw new DocumentNotFoundError("league", id);
    }

    return LeagueDto.fromModel(league);
  }

  @Query(() => [LeagueDto])
  async leagues(@Args() args: GetLeaguesArgs) {
    const leagues = await this.leagueService.findAll(args.orderBy);
    return leagues.map(league => LeagueDto.fromModel(league));
  }

  @ResolveField(() => [MemberDto])
  async members(@Parent() league: LeagueDto) {
    const members = await this.leagueService.findLeagueMembers(league.id);
    return members.map(member => MemberDto.fromModel(member));
  }

  @ResolveField(() => [TransactionDto])
  async transactions(@Parent() league: LeagueDto) {
    const transactions = await this.transactionService.getLeagueTransactions(league.id);
    return transactions.map(transaction => TransactionDto.fromModel(transaction));
  }

  @UseGuards(GqlUserAuthGuard)
  @Mutation(() => LeagueDto)
  async createLeague(
    @Session() session: SessionToken,
    @Args("createLeagueInput") createLeagueInput: CreateLeagueInput
  ) {
    const league = await this.leagueService.createLeague(
      {
        name: createLeagueInput.name,
        startDate: createLeagueInput.startDate,
        endDate: createLeagueInput.endDate
      },
      { userId: session.userId }
    );

    return LeagueDto.fromModel(league);
  }

  @UseGuards(GqlUserAuthGuard)
  @Mutation(() => MembershipDto)
  async joinLeague(@Session() session: SessionToken, @Args("joinLeagueInput") joinLeagueInput: JoinLeagueInput) {
    const membership = await this.leagueService.registerMember(joinLeagueInput.leagueId, session.userId, {
      companyName: joinLeagueInput.companyName
    });

    return MembershipDto.fromModel(membership);
  }
}
