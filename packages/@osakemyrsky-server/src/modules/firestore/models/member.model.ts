import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class Member extends BaseModel {
  league!: {
    id: string;
    name: string;
  };

  user!: {
    id: string;
    name: string;
    picture: string | null;
  };

  companyName!: string;

  balanceCents!: number;

  balanceUpdatedAt!: string;
}

export const memberConverter: FirestoreDataConverter<Member> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const member = new Member();

    member.id = (data.id as string) || snapshot.id;
    member.createdAt = snapshot.createTime.toDate().toISOString();
    member.updatedAt = snapshot.updateTime.toDate().toISOString();
    member.league = {
      id: (data.league as DocumentData).id as string,
      name: (data.league as DocumentData).name as string
    };
    member.user = {
      id: (data.user as DocumentData).id as string,
      name: (data.user as DocumentData).name as string,
      picture: (data.user as DocumentData).picture as string
    };
    member.companyName = data.companyName as string;
    member.balanceCents = data.balanceCents as number;
    member.balanceUpdatedAt = data.balanceUpdatedAt as string;

    return member;
  },

  toFirestore: function (member: Member): DocumentData {
    return {
      id: member.id,
      league: {
        id: member.league.id,
        name: member.league.name
      },
      user: {
        id: member.user.id,
        name: member.user.name,
        picture: member.user.picture
      },
      companyName: member.companyName,
      balanceCents: member.balanceCents,
      balanceUpdatedAt: member.balanceUpdatedAt
    };
  }
};
