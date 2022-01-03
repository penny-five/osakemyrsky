import { FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class MemberLeague {
  id!: string;

  name!: string;
}

export class MemberUser {
  id!: string;

  name!: string;

  picture!: string | null;
}

export interface MemberBalanceHistory {
  [date: string]: number;
}

export class Member extends BaseModel {
  league!: MemberLeague;

  user!: MemberUser;

  companyName!: string;

  balanceCents!: number;

  balanceUpdatedAt!: string;

  balanceHistory!: MemberBalanceHistory;
}

export const memberConverter: FirestoreDataConverter<Member> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const member = new Member();

    member.id = (data.id as string) || snapshot.id;
    member.createdAt = snapshot.createTime.toDate().toISOString();
    member.updatedAt = snapshot.updateTime.toDate().toISOString();
    member.league = data.league as MemberLeague;
    member.user = data.user as MemberUser;
    member.companyName = data.companyName as string;
    member.balanceCents = data.balanceCents as number;
    member.balanceUpdatedAt = data.balanceUpdatedAt as string;
    member.balanceHistory = data.balanceHistory as MemberBalanceHistory;

    return member;
  },

  toFirestore: function (member: Member) {
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
      balanceUpdatedAt: member.balanceUpdatedAt,
      balanceHistory: member.balanceHistory
    };
  }
};
