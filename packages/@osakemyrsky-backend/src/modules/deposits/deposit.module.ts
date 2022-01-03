import { Module } from "@nestjs/common";

import { FirestoreModule } from "../firestore/firestore.module";

import { DepositService } from "./deposit.service";

@Module({
  imports: [FirestoreModule],
  providers: [DepositService],
  exports: [DepositService]
})
export class DepositModule {}
