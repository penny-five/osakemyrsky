import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { GraphQLDate, GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

import { isAfter, isBefore, isSameDay } from "../../../utils/dates";
import { League } from "../../firestore/models/league.model";

enum LeagueStatus {
  STARTING = "STARTING",
  ONGOING = "ONGOING",
  ENDED = "ENDED"
}

registerEnumType(LeagueStatus, { name: "LeagueStatus" });

const resolveLeagueStatus = (startDate: string, endDate: string, now = new Date()) => {
  if (!isSameDay(now, startDate) && isBefore(now, startDate)) {
    return LeagueStatus.STARTING;
  }
  if (!isSameDay(now, endDate) && isAfter(now, endDate)) {
    return LeagueStatus.ENDED;
  }
  return LeagueStatus.ONGOING;
};

@ObjectType("LeagueCreator")
export class LeagueCreatorDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;
}

@ObjectType("League")
export class LeagueDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => GraphQLDate, { nullable: false })
  startDate!: string;

  @Field(() => GraphQLDate, { nullable: false })
  endDate!: string;

  @Field(() => LeagueStatus, { nullable: false })
  status!: LeagueStatus;

  @Field(() => LeagueCreatorDto, { nullable: false })
  creator!: LeagueCreatorDto;

  static fromModel(model: League) {
    const dto = new LeagueDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.name = model.name;
    dto.startDate = model.startDate;
    dto.endDate = model.endDate;
    dto.status = resolveLeagueStatus(model.startDate, model.endDate);
    dto.creator = new LeagueCreatorDto();
    dto.creator.id = model.creator.id;
    dto.creator.name = model.creator.name;
    dto.creator.picture = model.creator.picture;
    return dto;
  }
}
