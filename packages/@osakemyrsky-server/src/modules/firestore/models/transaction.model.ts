import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export class Transaction extends BaseModel {
  leagueId!: string;

  member!: {
    id: string;
    name: string;
    picture: string | null;
  };

  stock!: {
    name: string;
    symbol: string;
  };

  type!: TransactionType;

  count!: number;

  priceCents!: number;
}

export const transactionConverter: FirestoreDataConverter<Transaction> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const transaction = new Transaction();

    transaction.id = snapshot.id;
    transaction.createdAt = snapshot.createTime.toDate().toISOString();
    transaction.updatedAt = snapshot.updateTime.toDate().toISOString();
    transaction.leagueId = data.leagueId as string;
    transaction.member = {
      id: (data.member as DocumentData).id as string,
      name: (data.member as DocumentData).id as string,
      picture: (data.member as DocumentData).name as string
    };
    transaction.type = data.type as TransactionType;
    transaction.stock = {
      name: (data.stock as DocumentData).name as string,
      symbol: (data.stock as DocumentData).symbol as string
    };
    transaction.count = data.count as number;
    transaction.priceCents = data.priceCents as number;

    return transaction;
  },

  toFirestore: function (transaction: Transaction): DocumentData {
    return {
      leagueId: transaction.leagueId,
      member: {
        id: transaction.member.id,
        name: transaction.member.name,
        picture: transaction.member.picture
      },
      type: transaction.type,
      stock: {
        name: transaction.stock.name,
        symbol: transaction.stock.symbol
      },
      count: transaction.count,
      priceCents: transaction.priceCents
    };
  }
};
