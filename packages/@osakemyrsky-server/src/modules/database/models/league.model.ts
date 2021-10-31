import { Field, ID, ObjectType } from "@nestjs/graphql";

import { isAfter } from "../../../utils/dates";

import { BaseModel } from "./base/base.model";
import { User } from "./user.model";

@ObjectType()
export class League extends BaseModel {
  static tableName = "league";

  @Field(() => ID, { nullable: false })
  readonly id!: string;

  @Field({ nullable: false })
  name!: string;

  creatorId!: string;

  @Field(() => User)
  creator!: User;

  @Field({ nullable: false })
  startDate!: string;

  @Field({ nullable: false })
  endDate!: string;

  @Field(() => [User])
  members!: User;

  @Field({ nullable: true })
  companyName!: string;

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
      relation: BaseModel.ManyToManyRelation,
      modelClass: "user.model",
      join: {
        from: "league.id",
        through: {
          from: "member.leagueId",
          to: "member.userId"
        },
        to: "user.id"
      }
    }
  };
}
