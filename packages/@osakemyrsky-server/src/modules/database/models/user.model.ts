import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";

import { BaseModel } from "./base/base.model";
import { Member } from "./member.model";

@ObjectType()
export class User extends BaseModel {
  static tableName = "user";

  @Field(() => GraphQLUUID, { nullable: false })
  readonly id!: string;

  @Field({ nullable: false })
  name!: string;

  email!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;

  @Field(() => [Member])
  memberships!: Member[];

  static relationMappings = {
    memberships: {
      relation: BaseModel.HasManyRelation,
      modelClass: "member.model",
      join: {
        from: "user.id",
        to: "member.userId"
      }
    }
  };
}
