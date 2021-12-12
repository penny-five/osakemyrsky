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
    userId: string;
    name: string;
    picture: string | null;
    companyName: string;
  };

  stock!: {
    name: string;
    symbol: string;
  };

  type!: TransactionType;

  count!: number;

  unitPriceCents!: number;
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
      userId: (data.member as DocumentData).userId as string,
      name: (data.member as DocumentData).name as string,
      picture: (data.member as DocumentData).picture as string,
      companyName: (data.member as DocumentData).companyName as string
    };
    transaction.stock = {
      name: (data.stock as DocumentData).name as string,
      symbol: (data.stock as DocumentData).symbol as string
    };
    transaction.type = data.type as TransactionType;
    transaction.count = data.count as number;
    transaction.unitPriceCents = data.unitPriceCents as number;

    return transaction;
  },

  toFirestore: function (transaction: Transaction): DocumentData {
    return {
      leagueId: transaction.leagueId,
      member: {
        id: transaction.member.id,
        userId: transaction.member.userId,
        name: transaction.member.name,
        picture: transaction.member.picture,
        companyName: transaction.member.companyName
      },
      stock: {
        name: transaction.stock.name,
        symbol: transaction.stock.symbol
      },
      type: transaction.type,
      count: transaction.count,
      unitPriceCents: transaction.unitPriceCents
    };
  }
};
