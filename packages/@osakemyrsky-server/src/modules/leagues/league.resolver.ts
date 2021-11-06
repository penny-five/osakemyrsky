import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { League } from "../database/models/league.model";
import { Member } from "../database/models/member.model";

import { CreateLeagueInput } from "./dto/create-league.input";
import { GetLeaguesArgs } from "./dto/get-leagues.args";
import { JoinLeagueInput } from "./dto/join-league.input";
import { LeagueService } from "./league.service";

@Resolver(() => League)
export class LeagueResolver {
  constructor(private readonly leagueService: LeagueService) {}

  @Query(() => League)
  league(@Args("id") id: string) {
    return this.leagueService.findById(id);
  }

  @Query(() => [League])
  leagues(@Args() args: GetLeaguesArgs) {
    return this.leagueService.findAll(args);
  }

  @ResolveField()
  async members(@Parent() league: League) {
    return this.leagueService.findLeagueMembers(league.id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => League)
  async createLeague(
    @Token() token: AuthenticationToken,
    @Args("createLeagueInput") createLeagueInput: CreateLeagueInput
  ) {
    return this.leagueService.createLeague({
      creatorId: token.sub,
      name: createLeagueInput.name,
      startDate: createLeagueInput.startDate,
      endDate: createLeagueInput.endDate
    });
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Member)
  async joinLeague(@Token() token: AuthenticationToken, @Args("joinLeagueInput") joinLeagueInput: JoinLeagueInput) {
    return this.leagueService.registerMember(joinLeagueInput.leagueId, {
      userId: token.sub,
      companyName: joinLeagueInput.companyName
    });
  }
}
