import { Field, ID, ObjectType } from "@nestjs/graphql";

import { BaseModel } from "./base/base.model";
import { League } from "./league.model";
import { User } from "./user.model";

@ObjectType()
export class Member extends BaseModel {
  static tableName = "member";

  @Field(() => ID, { nullable: false })
  readonly id!: string;

  @Field({ nullable: false })
  companyName!: string;

  userId!: string;

  @Field(() => User)
  user!: User;

  leagueId!: string;

  @Field(() => League)
  league!: League;

  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "user.model",
      join: {
        from: "member.userId",
        to: "user.id"
      }
    },
    league: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: "league.model",
      join: {
        from: "member.leagueId",
        to: "league.id"
      }
    }
  };
}
