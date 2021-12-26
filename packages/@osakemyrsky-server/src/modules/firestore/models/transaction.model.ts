import { FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export class TransactionMember {
  id!: string;

  userId!: string;

  name!: string;

  picture!: string | null;

  companyName!: string;
}

export class TransactionStock {
  name!: string;

  symbol!: string;

  exchangeCountry!: string;
}

export class Transaction extends BaseModel {
  leagueId!: string;

  member!: TransactionMember;

  stock!: TransactionStock;

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
    transaction.member = data.member as TransactionMember;
    transaction.stock = data.stock as TransactionStock;
    transaction.type = data.type as TransactionType;
    transaction.count = data.count as number;
    transaction.unitPriceCents = data.unitPriceCents as number;

    return transaction;
  },

  toFirestore: function (transaction: Transaction) {
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
        symbol: transaction.stock.symbol,
        exchangeCountry: transaction.stock.exchangeCountry
      },
      type: transaction.type,
      count: transaction.count,
      unitPriceCents: transaction.unitPriceCents
    };
  }
};
