import { forwardRef, Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";
import { LeagueModule } from "../leagues/league.module";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [FirestoreModule, forwardRef(() => LeagueModule)],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
