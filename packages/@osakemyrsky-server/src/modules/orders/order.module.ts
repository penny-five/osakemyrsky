import { Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";
import { LeagueModule } from "../leagues/league.module";

import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";

@Module({
  imports: [FirestoreModule, LeagueModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService]
})
export class OrderModule {}
