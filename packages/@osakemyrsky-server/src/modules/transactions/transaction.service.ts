import { Firestore } from "@google-cloud/firestore";
import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { transactionConverter } from "../firestore/models/transaction.model";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface CommitTransactionParams {
  stockSymbol: string;
  count: number;
  priceCents: number;
  type: TransactionType;
}

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly firestore: Firestore) {}

  async commitTransaction(leagueId: string, memberId: string, params: CommitTransactionParams) {
    const id = uuid();

    const transactionRef = this.firestore
      .collection("leagueId")
      .doc(leagueId)
      .collection("members")
      .doc(memberId)
      .collection("transactions")
      .withConverter(transactionConverter)
      .doc(id);

    await transactionRef.set({
      stockSymbol: params.stockSymbol,
      count: params.count,
      priceCents: params.priceCents,
      type: params.type
    });

    this.logger.log(
      {
        leagueId,
        memberId,
        params
      },
      "Commit transaction"
    );

    const res = await transactionRef.get();
    return res.data();
  }
}
