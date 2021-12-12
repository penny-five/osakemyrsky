import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Query, Resolver, Args, ResolveField, Parent } from "@nestjs/graphql";

import { DocumentNotFoundError } from "../../common/errors";
import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { User } from "../firestore/models/user.model";
import { MembershipDto } from "../leagues/dto/membership.dto";
import { LeagueService } from "../leagues/league.service";

import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Resolver(() => UserDto)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver {
  constructor(private readonly leagueService: LeagueService, private readonly userService: UserService) {}

  @Query(() => UserDto)
  async me(@Token() token: AuthenticationToken) {
    const user = await this.userService.findUserById(token.sub);

    if (user == null) {
      throw new UnauthorizedException("User not found");
    }

    return UserDto.fromModel(user);
  }

  @Query(() => UserDto)
  async user(@Args("id") id: string) {
    const user = await this.userService.findUserById(id);

    if (user == null) {
      throw new DocumentNotFoundError("user", id);
    }

    return UserDto.fromModel(user);
  }

  @ResolveField(() => [MembershipDto])
  async memberships(@Parent() user: User) {
    const memberships = await this.leagueService.findUserMemberships(user.id!);
    return memberships.map(membership => MembershipDto.fromModel(membership));
  }
}
