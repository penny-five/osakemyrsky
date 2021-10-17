import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { League } from "../database/models/league.model";

import { CreateLeagueInput } from "./dto/create-league.input";
import { GetLeaguesArgs } from "./dto/get-leagues.args";
import { RegisterMemberInput } from "./dto/register-member.input";
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
    @Args("createLeagueData") createLeagueData: CreateLeagueInput
  ) {
    return this.leagueService.createLeague({
      creatorId: token.sub,
      name: createLeagueData.name,
      startDate: createLeagueData.startDate,
      endDate: createLeagueData.endDate
    });
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => League)
  async registerMember(@Args("registerMemberData") registerMemberData: RegisterMemberInput) {
    return this.leagueService.registerMember(registerMemberData.leagueId, {
      userId: registerMemberData.userId,
      companyName: registerMemberData.companyName
    });
  }
}
