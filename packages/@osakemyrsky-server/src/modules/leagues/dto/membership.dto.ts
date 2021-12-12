import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

import { Membership } from "../../firestore/models/membership.model";

@ObjectType("Membership")
export class MembershipDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  leagueId!: string;

  @Field({ nullable: false })
  leagueName!: string;

  @Field({ nullable: false })
  companyName!: string;

  static fromModel(model: Membership) {
    const dto = new MembershipDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.leagueId = model.leagueId;
    dto.leagueName = model.leagueName;
    dto.companyName = model.companyName;
    return dto;
  }
}
