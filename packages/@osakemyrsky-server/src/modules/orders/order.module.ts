import { Module } from "@nestjs/common";

import { LeagueModule } from "../leagues/league.module";

import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";

@Module({
  imports: [LeagueModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService]
})
export class OrderModule {}
