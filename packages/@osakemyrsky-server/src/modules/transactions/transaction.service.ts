import { Firestore } from "@google-cloud/firestore";
import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { compareDesc } from "../../utils/dates";
import { Order } from "../firestore/models/order.model";
import { Transaction, transactionConverter, TransactionType } from "../firestore/models/transaction.model";

export interface CommitTransactionParams {
  order: Order;
  unitPriceCents: number;
  type: TransactionType;
}

export interface MemberStockSnapshot {
  stock: {
    symbol: string;
    name: string;
    exchangeCountry: string;
  };
  count: number;
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

  async getMemberStocks(leagueId: string, memberId: string): Promise<MemberStockSnapshot[]> {
    const transactions = await this.getMemberTransactions(leagueId, memberId);

    const transactionsBySymbol = transactions.reduce((acc, transaction) => {
      if (acc[transaction.stock.symbol] == null) {
        acc[transaction.stock.symbol] = [];
      }

      acc[transaction.stock.symbol].push(transaction);

      return acc;
    }, {} as Record<string, Transaction[]>);

    return Object.entries(transactionsBySymbol)
      .map(([symbol, transactions]) => {
        return {
          stock: {
            symbol,
            name: transactions[0].stock.name,
            exchangeCountry: transactions[0].stock.exchangeCountry
          },
          count: transactions.reduce((total, transaction) => {
            return total + (transaction.type === TransactionType.BUY ? transaction.count : -transaction.count);
          }, 0)
        };
      })
      .filter(snapshot => snapshot.count <= 0);
  }
}
