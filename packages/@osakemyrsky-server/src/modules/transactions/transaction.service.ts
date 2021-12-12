import { Firestore } from "@google-cloud/firestore";
import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { transactionConverter } from "../firestore/models/transaction.model";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface CommitTransactionParams {
  leagueId: string;
  member: { id: string; name: string; picture: string | null };
  stock: { name: string; symbol: string };
  count: number;
  unitPriceCents: number;
  type: TransactionType;
}

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly firestore: Firestore) {}

  async findLeagueTransactions(leagueId: string) {
    const res = await this.firestore
      .collectionGroup("transactions")
      .where("leagueId", "==", leagueId)
      .withConverter(transactionConverter)
      .get();

    return res.docs.map(doc => doc.data());
  }

  async commitTransaction(params: CommitTransactionParams) {
    const id = uuid();

    const transactionRef = this.firestore
      .collection("leagues")
      .doc(params.leagueId)
      .collection("members")
      .doc(params.member.id)
      .collection("transactions")
      .withConverter(transactionConverter)
      .doc(id);

    await transactionRef.set({
      leagueId: params.leagueId,
      member: params.member,
      stock: params.stock,
      count: params.count,
      unitPriceCents: params.unitPriceCents,
      type: params.type
    });

    this.logger.log(
      {
        params
      },
      "Commit transaction"
    );

    const res = await transactionRef.get();
    return res.data();
  }
}
