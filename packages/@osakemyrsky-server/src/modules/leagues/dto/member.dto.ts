import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLInt } from "graphql";
import { GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

import { Member } from "../../firestore/models/member.model";

@ObjectType("MemberLeague")
export class MemberLeagueDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field({ nullable: false })
  name!: string;
}

@ObjectType("MemberUser")
export class MemberUserDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;
}

@ObjectType("Member")
export class MemberDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field(() => MemberLeagueDto, { nullable: false })
  league!: MemberLeagueDto;

  @Field(() => MemberUserDto, { nullable: false })
  user!: MemberUserDto;

  @Field({ nullable: false })
  companyName!: string;

  @Field(() => GraphQLInt, { nullable: false })
  balanceCents!: number;

  @Field(() => GraphQLDateTime, { nullable: false })
  balanceUpdatedAt!: string;

  static fromModel(model: Member) {
    const dto = new MemberDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.league = new MemberLeagueDto();
    dto.league.id = model.league.id;
    dto.league.name = model.league.name;
    dto.user = new MemberUserDto();
    dto.user.id = model.user.id;
    dto.user.name = model.user.name;
    dto.user.picture = model.user.picture;
    dto.companyName = model.companyName;
    dto.balanceCents = model.balanceCents;
    dto.balanceUpdatedAt = model.balanceUpdatedAt;
    return dto;
  }
}
