import { FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class MembershipLeague {
  id!: string;

  name!: string;
}

export class MembershipMember {
  id!: string;

  companyName!: string;
}

export class Membership extends BaseModel {
  league!: MembershipLeague;

  member!: MembershipMember;
}

export const membershipConverter: FirestoreDataConverter<Membership> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const membership = new Membership();

    membership.id = snapshot.id;
    membership.createdAt = snapshot.createTime.toDate().toISOString();
    membership.updatedAt = snapshot.updateTime.toDate().toISOString();
    membership.league = data.league as MembershipLeague;
    membership.member = data.member as MembershipMember;

    return membership;
  },

  toFirestore: function (membership: Membership) {
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
