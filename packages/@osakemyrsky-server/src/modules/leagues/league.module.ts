import { Module } from "@nestjs/common";

import { LeagueResolver } from "./league.resolver";
import { LeagueService } from "./league.service";

@Module({
  providers: [LeagueService, LeagueResolver],
  exports: [LeagueService]
})
export class LeagueModule {}
