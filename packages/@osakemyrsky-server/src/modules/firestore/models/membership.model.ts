import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class Membership extends BaseModel {
  leagueId!: string;

  leagueName!: string;

  companyName!: string;
}

export const membershipConverter: FirestoreDataConverter<Membership> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const membership = new Membership();

    membership.id = snapshot.id;
    membership.createdAt = snapshot.createTime.toDate().toISOString();
    membership.updatedAt = snapshot.updateTime.toDate().toISOString();
    membership.leagueId = data.leagueId as string;
    membership.leagueName = data.leagueName as string;
    membership.companyName = data.companyName as string;

    return membership;
  },

  toFirestore: function (membership: Membership): DocumentData {
    return {
      leagueId: membership.leagueId,
      leagueName: membership.leagueName,
      companyName: membership.companyName
    };
  }
};
