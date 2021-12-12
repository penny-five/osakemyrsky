import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DepositModule } from "../deposits/deposit.module";
import { FirestoreModule } from "../firestore/firestore.module";
import { TransactionModule } from "../transactions/transaction.module";
import { UserModule } from "../users/user.module";

import { LeagueResolver } from "./league.resolver";
import { LeagueService } from "./league.service";

@Module({
  imports: [ConfigModule, FirestoreModule, forwardRef(() => UserModule), DepositModule, TransactionModule],
  providers: [LeagueService, LeagueResolver],
  exports: [LeagueService]
})
export class LeagueModule {}
