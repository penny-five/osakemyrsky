import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLInt } from "graphql";
import { GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

import { Member } from "../../firestore/models/member.model";

@ObjectType("Member")
export class MemberDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  userId!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;

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
    dto.userId = model.userId;
    dto.name = model.name;
    dto.picture = model.picture;
    dto.companyName = model.companyName;
    dto.balanceCents = model.balanceCents;
    dto.balanceUpdatedAt = model.balanceUpdatedAt;
    return dto;
  }
}
