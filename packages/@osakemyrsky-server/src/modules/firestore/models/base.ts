import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDateTime, GraphQLUUID } from "graphql-scalars";

@ObjectType({ isAbstract: true })
export class BaseModel {
  @Field(() => GraphQLUUID, { nullable: false })
  id?: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt?: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt?: string;
}
