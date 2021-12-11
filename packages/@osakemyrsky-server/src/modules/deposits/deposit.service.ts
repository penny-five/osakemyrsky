import { Firestore } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { depositConverter } from "../firestore/models/deposit.model";

@Injectable()
export class DepositService {
  constructor(private readonly firestore: Firestore) {}

  async placeDeposit(leagueId: string, memberId: string, valueCents: number) {
    const id = uuid();

    const depositRef = this.firestore
      .collection("leagues")
      .doc(leagueId)
      .collection("members")
      .doc(memberId)
      .collection("deposits")
      .withConverter(depositConverter)
      .doc(id);

    await depositRef.set({ id, valueCents });

    const res = await depositRef.get();
    return res.data()!;
  }
}
