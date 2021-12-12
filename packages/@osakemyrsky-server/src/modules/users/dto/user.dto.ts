import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

import { User } from "../../firestore/models/user.model";

@ObjectType("User")
export class UserDto {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  @Field({ nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  picture!: string | null;

  static fromModel(model: User) {
    const dto = new UserDto();
    dto.id = model.id!;
    dto.createdAt = model.createdAt!;
    dto.updatedAt = model.updatedAt!;
    dto.name = model.name;
    dto.picture = model.picture;
    return dto;
  }
}
