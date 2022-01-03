import { FirestoreDataConverter, Timestamp } from "@google-cloud/firestore";

import { formatISODate } from "../../../utils/dates";

import { BaseModel } from "./base";

export class LeagueCreator {
  id!: string;

  name!: string;

  picture!: string | null;
}

export class League extends BaseModel {
  name!: string;

  startDate!: string;

  endDate!: string;

  creator!: LeagueCreator;
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
    league.creator = data.creator as LeagueCreator;

    return league;
  },

  toFirestore(league: League) {
    return {
      startDate: league.startDate,
      endDate: league.endDate,
      name: league.name,
      creator: {
        id: league.creator.id,
        name: league.creator.name,
        picture: league.creator.picture
      }
    };
  }
};
