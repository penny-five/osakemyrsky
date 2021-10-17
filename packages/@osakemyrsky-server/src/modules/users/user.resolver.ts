import { UseGuards } from "@nestjs/common";
import { Query, Resolver, Args } from "@nestjs/graphql";

import { AuthenticationToken } from "../authentication/authentication.types";
import { Token } from "../authentication/decorators/token.decorator";
import { GqlJwtAuthGuard } from "../authentication/guards/qgl.jwt.guard";
import { User } from "../database/models/user.model";

import { GetUsersArgs } from "./dto/get-users.args";
import { UserService } from "./user.service";

@Resolver(() => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
}
