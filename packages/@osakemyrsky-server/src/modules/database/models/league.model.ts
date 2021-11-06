import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLUUID } from "graphql-scalars";

import { isAfter } from "../../../utils/dates";

import { BaseModel } from "./base/base.model";
import { User } from "./user.model";

@ObjectType()
export class League extends BaseModel {
  static tableName = "league";

  @Field(() => GraphQLUUID, { nullable: false })
  readonly id!: string;

  @Field({ nullable: false })
  name!: string;

  creatorId!: string;

  @Field(() => User)
  creator!: User;

  @Field(() => GraphQLDate, { nullable: false })
  startDate!: string;

  @Field(() => GraphQLDate, { nullable: false })
  endDate!: string;

  @Field(() => [User])
  members!: User;

  hasEndedOn(date: Date | string) {
    return isAfter(date, this.endDate);
  }

  hasStartedOn(date: Date | string) {
    return isAfter(date, this.startDate);
  }

  isOngoingOn(date: Date | string) {
    return this.hasStartedOn(date) && !this.hasEndedOn(date);
  }

  static relationMappings = {
    creator: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "user.model",
      join: {
        from: "league.creatorId",
        to: "user.id"
      }
    },
    members: {
      relation: BaseModel.HasManyRelation,
      modelClass: "member.model",
      join: {
        from: "league.id",
        to: "member.leagueId"
      }
    }
  };
}
