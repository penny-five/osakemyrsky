import { Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";
import { StockModule } from "../stocks/stock.module";

import { TransactionService } from "./transaction.service";

@Module({
  imports: [FirestoreModule, StockModule],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}
