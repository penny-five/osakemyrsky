import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";
import { Field, ObjectType } from "@nestjs/graphql";

import { BaseModel } from "./base";

@ObjectType()
export class Membership extends BaseModel {
  @Field({ nullable: false })
  leagueId!: string;

  @Field({ nullable: false })
  leagueName!: string;

  @Field({ nullable: false })
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
