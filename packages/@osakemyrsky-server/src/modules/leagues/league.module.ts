import { forwardRef, Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";
import { UserModule } from "../users/user.module";

import { LeagueResolver } from "./league.resolver";
import { LeagueService } from "./league.service";

@Module({
  imports: [FirestoreModule, forwardRef(() => UserModule)],
  providers: [LeagueService, LeagueResolver],
  exports: [LeagueService]
})
export class LeagueModule {}
