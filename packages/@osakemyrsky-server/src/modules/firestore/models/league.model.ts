import { DocumentData, FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDate } from "graphql-scalars";

import { formatISODate } from "../../../utils/dates";

import { BaseModel } from "./base";

@ObjectType()
export class LeagueCreator {
  userId!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;
}

@ObjectType()
export class League extends BaseModel {
  @Field({ nullable: false })
  name!: string;

  @Field(() => GraphQLDate, { nullable: false })
  startDate!: string;

  @Field(() => GraphQLDate, { nullable: false })
  endDate!: string;

  @Field(() => LeagueCreator, { nullable: false })
  creator!: LeagueCreator;
}

export const leagueConverter: FirestoreDataConverter<League> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();

    const league = new League();

    league.id = snapshot.id;
    league.createdAt = snapshot.createTime.toDate().toISOString();
    league.updatedAt = snapshot.updateTime.toDate().toISOString();
    league.startDate = formatISODate((data.startDate as Timestamp).toDate());
    league.endDate = formatISODate((data.endDate as Timestamp).toDate());
    league.name = data.name as string;

    league.creator = new LeagueCreator();
    league.creator.userId = (data.creator as DocumentData).userId as string;
    league.creator.name = (data.creator as DocumentData).name as string;
    league.creator.picture = (data.creator as DocumentData).picture as string;

    return league;
  },

  toFirestore(league: League) {
    return {
      startDate: league.startDate,
      endDate: league.endDate,
      name: league.name,
      creator: {
        userId: league.creator.userId,
        name: league.creator.name,
        picture: league.creator.picture
      }
    };
  }
};
