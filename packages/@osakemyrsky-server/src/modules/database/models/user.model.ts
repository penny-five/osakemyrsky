import { Field, ID, ObjectType } from "@nestjs/graphql";

import { BaseModel } from "./base/base.model";
import { League } from "./league.model";

@ObjectType()
export class User extends BaseModel {
  static tableName = "user";

  @Field(() => ID, { nullable: false })
  readonly id!: string;

  @Field({ nullable: false })
  name!: string;

  email!: string;

  @Field(() => [League])
  leagues!: League[];

  static relationMappings = {
    leagues: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: "league.model",
      join: {
        from: "user.id",
        through: {
          from: "member.userId",
          to: "member.leagueId"
        },
        to: "league.id",
        extra: ["companyName"]
      }
    }
  };
}
