import { forwardRef, Module } from "@nestjs/common";

import { DepositModule } from "../deposits/deposit.module";
import { FirestoreModule } from "../firestore/firestore.module";
import { OrderModule } from "../orders/order.module";
import { StockModule } from "../stocks/stock.module";
import { TransactionModule } from "../transactions/transaction.module";
import { UserModule } from "../users/user.module";

import { LeagueResolver } from "./league.resolver";
import { LeagueService } from "./league.service";
import { MemberResolver } from "./member.resolver";

@Module({
  imports: [
    FirestoreModule,
    forwardRef(() => UserModule),
    forwardRef(() => StockModule),
    forwardRef(() => OrderModule),
    DepositModule,
    TransactionModule
  ],
  providers: [LeagueService, LeagueResolver, MemberResolver],
  exports: [LeagueService]
})
export class LeagueModule {}
