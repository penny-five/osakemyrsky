import { FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class Deposit extends BaseModel {
  valueCents!: number;
}

export const depositConverter: FirestoreDataConverter<Deposit> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const deposit = new Deposit();

    deposit.id = snapshot.id;
    deposit.createdAt = snapshot.createTime.toDate().toISOString();
    deposit.updatedAt = snapshot.updateTime.toDate().toISOString();
    deposit.valueCents = data.valueCents as number;

    return deposit;
  },

  toFirestore: function (deposit: Deposit) {
    return {
      valueCents: deposit.valueCents
    };
  }
};
