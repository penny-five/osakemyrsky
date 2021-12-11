import { Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";

import { TransactionService } from "./transaction.service";

@Module({
  imports: [FirestoreModule],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}
