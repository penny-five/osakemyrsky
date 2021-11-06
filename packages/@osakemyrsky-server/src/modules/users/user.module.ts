import { Module } from "@nestjs/common";

import { LeagueModule } from "../leagues/league.module";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [LeagueModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
