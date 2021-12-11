import { Firestore } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";

import { membershipConverter } from "../firestore/models/membership.model";
import { User, userConverter } from "../firestore/models/user.model";

export enum UsersOrderBy {
  NAME = "name"
}

@Injectable()
export class UserService {
  constructor(private readonly firestore: Firestore) {}

  async createUser(params: Pick<User, "sub" | "name" | "email" | "picture">) {
    const id = uuid();
    await this.firestore.collection("users").withConverter(userConverter).doc(id).create(params);
    return (await this.findUserById(id))!;
  }

  async findUserById(id: string) {
    const res = await this.firestore.collection("users").withConverter(userConverter).doc(id).get();
    return res.data();
  }

  async updateUser(id: string, user: Partial<Pick<User, "sub" | "name" | "email" | "picture">>) {
    await this.firestore.collection("users").withConverter(userConverter).doc(id).update(user);
  }

  async findUserByEmail(email: string) {
    const res = await this.firestore.collection("users").withConverter(userConverter).where("email", "==", email).get();
    return res.empty ? undefined : res.docs[0].data();
  }

  async findBySub(sub: string) {
    const res = await this.firestore.collection("users").withConverter(userConverter).where("sub", "==", sub).get();
    return res.empty ? undefined : res.docs[0].data();
  }

  async findUserMemberships(userId: string) {
    const res = await this.firestore
      .collection("users")
      .doc(userId)
      .collection("memberships")
      .withConverter(membershipConverter)
      .get();

    return res.docs.map(doc => doc.data());
  }
}
