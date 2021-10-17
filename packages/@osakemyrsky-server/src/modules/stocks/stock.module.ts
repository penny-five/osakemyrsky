import { Module } from "@nestjs/common";

import { NordnetModule } from "../nordnet/nordnet.module";

import { StockResolver } from "./stock.resolver";
import { StockService } from "./stock.service";

@Module({
  providers: [StockService, StockResolver],
  imports: [NordnetModule],
  exports: [StockService]
})
export class StockModule {}
