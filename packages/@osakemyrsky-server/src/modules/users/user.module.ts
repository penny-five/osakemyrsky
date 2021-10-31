import { Module } from "@nestjs/common";

import { LeagueService } from "../leagues/league.service";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, UserResolver, LeagueService],
  exports: [UserService]
})
export class UserModule {}
