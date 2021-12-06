import { DocumentData, FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { isAfter, isBefore, isSameDay } from "date-fns";
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

export enum LeagueStatus {
  STARTING = "STARTING",
  ONGOING = "ONGOING",
  ENDED = "ENDED"
}

registerEnumType(LeagueStatus, { name: "LeagueStatus" });

const resolveLeagueStatus = (startDate: Date, endDate: Date, now = new Date()) => {
  if (!isSameDay(now, startDate) && isBefore(now, startDate)) {
    return LeagueStatus.STARTING;
  }
  if (!isSameDay(now, endDate) && isAfter(now, endDate)) {
    return LeagueStatus.ENDED;
  }
  return LeagueStatus.ONGOING;
};

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

  @Field(() => LeagueStatus)
  status!: LeagueStatus;
}

export const leagueConverter: FirestoreDataConverter<League> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    const startDate = (data.startDate as Timestamp).toDate();
    const endDate = (data.endDate as Timestamp).toDate();

    const league = new League();

    league.id = snapshot.id;
    league.createdAt = snapshot.createTime.toDate().toISOString();
    league.updatedAt = snapshot.updateTime.toDate().toISOString();
    league.startDate = formatISODate(startDate);
    league.endDate = formatISODate(endDate);
    league.name = data.name as string;
    league.status = resolveLeagueStatus(startDate, endDate);

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
