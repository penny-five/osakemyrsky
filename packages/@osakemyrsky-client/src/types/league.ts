import { Member } from "./member";

export enum LeagueStatus {
  STARTING = "STARTING",
  ONGOING = "ONGOING",
  ENDED = "ENDED"
}

export interface League {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  startDate: string;
  endDate: string;
  status: LeagueStatus;
  members?: Member[];
}
