import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";
import { ObjectType } from "@nestjs/graphql";

import { BaseModel } from "./base";

@ObjectType()
export class User extends BaseModel {
  sub!: string;

  name!: string;

  email!: string | null;

  picture!: string | null;
}

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const user = new User();

    user.id = snapshot.id;
    user.createdAt = snapshot.createTime.toDate().toISOString();
    user.updatedAt = snapshot.updateTime.toDate().toISOString();
    user.sub = data.sub as string;
    user.name = data.name as string;
    user.email = data.email as string;
    user.picture = data.picture as string;

    return user;
  },

  toFirestore: function (user: User): DocumentData {
    return {
      sub: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture
    };
  }
};
