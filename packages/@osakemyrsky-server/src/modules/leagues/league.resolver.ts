import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { DocumentNotFoundError } from "../../common/errors";
import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
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
    const transactions = await this.transactionService.findLeagueTransactions(league.id);
    return transactions.map(transaction => TransactionDto.fromModel(transaction));
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => LeagueDto)
  async createLeague(
    @Token() token: AuthenticationToken,
    @Args("createLeagueInput") createLeagueInput: CreateLeagueInput
  ) {
    const league = await this.leagueService.createLeague(
      {
        name: createLeagueInput.name,
        startDate: createLeagueInput.startDate,
        endDate: createLeagueInput.endDate
      },
      { userId: token.sub }
    );

    return LeagueDto.fromModel(league);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => MembershipDto)
  async joinLeague(@Token() token: AuthenticationToken, @Args("joinLeagueInput") joinLeagueInput: JoinLeagueInput) {
    const membership = await this.leagueService.registerMember(joinLeagueInput.leagueId, token.sub, {
      companyName: joinLeagueInput.companyName
    });

    return MembershipDto.fromModel(membership);
  }
}
