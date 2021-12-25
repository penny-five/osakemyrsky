import { Firestore } from "@google-cloud/firestore";
import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { compareDesc } from "../../utils/dates";
import { Order } from "../firestore/models/order.model";
import { transactionConverter, TransactionType } from "../firestore/models/transaction.model";

export interface CommitTransactionParams {
  order: Order;
  unitPriceCents: number;
  type: TransactionType;
}

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private readonly firestore: Firestore) {}

  async getMemberTransactions(leagueId: string, memberId: string) {
    const res = await this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .doc(memberId)
      .collection("transactions")
      .withConverter(transactionConverter)
      .get();

    return res.docs.map(doc => doc.data());
  }

  async getLeagueTransactions(leagueId: string) {
    const res = await this.firestore
      .collectionGroup("transactions")
      .where("leagueId", "==", leagueId)
      .withConverter(transactionConverter)
      .get();

    return res.docs.map(doc => doc.data()).sort((first, second) => compareDesc(first.createdAt!, second.createdAt!));
  }

  async commitTransaction(params: CommitTransactionParams) {
    const id = uuid();

    const transactionRef = this.firestore
      .collection("leagues")
      .doc(params.order.leagueId)
      .collection("members")
      .doc(params.order.member.id)
      .collection("transactions")
      .withConverter(transactionConverter)
      .doc(id);

    await transactionRef.set({
      leagueId: params.order.leagueId,
      member: params.order.member,
      stock: params.order.stock,
      count: params.order.stockCount,
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
