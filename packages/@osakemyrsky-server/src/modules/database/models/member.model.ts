import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";

import { BaseModel } from "./base/base.model";
import { League } from "./league.model";
import { User } from "./user.model";

@ObjectType()
export class Member extends BaseModel {
  static tableName = "member";

  @Field(() => GraphQLUUID, { nullable: false })
  readonly id!: string;

  @Field({ nullable: false })
  companyName!: string;

  userId!: string;

  @Field(() => User, { nullable: true })
  user!: User;

  leagueId!: string;

  @Field(() => League, { nullable: true })
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
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "league.model",
      join: {
        from: "member.leagueId",
        to: "league.id"
      }
    }
  };
}
