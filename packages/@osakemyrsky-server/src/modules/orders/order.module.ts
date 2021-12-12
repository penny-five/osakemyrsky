import { Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";
import { LeagueModule } from "../leagues/league.module";
import { NordnetModule } from "../nordnet/nordnet.module";
import { StockModule } from "../stocks/stock.module";
import { TransactionModule } from "../transactions/transaction.module";

import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";

@Module({
  imports: [FirestoreModule, LeagueModule, TransactionModule, NordnetModule, StockModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService]
})
export class OrderModule {}
