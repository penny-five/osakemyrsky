import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

import { Membership } from "../../firestore/models/membership.model";

@ObjectType("MembershipMember")
export class MembershipMemberDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field({ nullable: false })
  companyName!: string;
}

@ObjectType("MembershipLeague")
export class MembershipLeagueDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field({ nullable: false })
  name!: string;
}

@ObjectType("Membership")
export class MembershipDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  member!: MembershipMemberDto;

  @Field({ nullable: false })
  league!: MembershipLeagueDto;

  static fromModel(model: Membership) {
    const dto = new MembershipDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.league = new MembershipLeagueDto();
    dto.league.id = model.league.id;
    dto.league.name = model.league.name;
    dto.member = new MembershipMemberDto();
    dto.member.id = model.member.id;
    dto.member.companyName = model.member.companyName;
    return dto;
  }
}
