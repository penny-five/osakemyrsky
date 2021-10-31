import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, Parent, ResolveField } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { User } from "../database/models/user.model";
import { LeagueService } from "../leagues/league.service";

import { GetUsersArgs } from "./dto/get-users.args";
import { UserService } from "./user.service";

@Resolver(() => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly leagueService: LeagueService) {}

  @Query(() => User)
  async me(@Token() token: AuthenticationToken) {
    return this.userService.findById(token.sub);
  }

  @Query(() => User)
  user(@Args("id") id: string) {
    return this.userService.findById(id);
  }

  @Query(() => [User])
  users(@Args() args: GetUsersArgs) {
    return this.userService.findAll(args);
  }

  @ResolveField()
  async leagues(@Parent() user: User) {
    return this.leagueService.findUserLeagues(user.id);
  }
}
