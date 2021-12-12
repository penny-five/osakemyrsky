import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";

import { BaseModel } from "./base";

export class Member extends BaseModel {
  userId!: string;

  name!: string;

  picture!: string | null;

  companyName!: string;
}

export const memberConverter: FirestoreDataConverter<Member> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const member = new Member();

    member.id = snapshot.id;
    member.createdAt = snapshot.createTime.toDate().toISOString();
    member.updatedAt = snapshot.updateTime.toDate().toISOString();
    member.userId = data.userId as string;
    member.name = data.name as string;
    member.picture = data.picture as string;
    member.companyName = data.companyName as string;

    return member;
  },

  toFirestore: function (member: Member): DocumentData {
    return {
      userId: member.userId,
      name: member.name,
      picture: member.picture,
      companyName: member.companyName
    };
  }
};
