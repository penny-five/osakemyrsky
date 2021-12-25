import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class Membership extends BaseModel {
  league!: {
    id: string;
    name: string;
  };

  member!: {
    id: string;
    companyName: string;
  };
}

export const membershipConverter: FirestoreDataConverter<Membership> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const membership = new Membership();

    membership.id = snapshot.id;
    membership.createdAt = snapshot.createTime.toDate().toISOString();
    membership.updatedAt = snapshot.updateTime.toDate().toISOString();
    membership.league = {
      id: (data.league as DocumentData).id as string,
      name: (data.league as DocumentData).name as string
    };
    membership.member = {
      id: (data.member as DocumentData).id as string,
      companyName: (data.member as DocumentData).companyName as string
    };

    return membership;
  },

  toFirestore: function (membership: Membership): DocumentData {
    return {
      league: {
        id: membership.league.id,
        name: membership.league.name
      },
      member: {
        id: membership.member.id,
        companyName: membership.member.companyName
      }
    };
  }
};
