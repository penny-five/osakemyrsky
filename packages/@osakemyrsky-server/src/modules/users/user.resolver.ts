import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { Membership } from "../firestore/models/membership.model";
import { User } from "../firestore/models/user.model";
import { LeagueService } from "../leagues/league.service";

import { UserService } from "./user.service";

@Resolver(() => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver {
  constructor(private readonly leagueService: LeagueService, private readonly userService: UserService) {}

  @Query(() => User)
  async me(@Token() token: AuthenticationToken) {
    const user = await this.userService.findUserById(token.sub);

    if (user == null) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }

  @Query(() => User)
  user(@Args("id") id: string) {
    return this.userService.findUserById(id);
  }

  @ResolveField(() => [Membership])
  async memberships(@Parent() user: User) {
    return this.leagueService.findUserMemberships(user.id!);
  }
}
