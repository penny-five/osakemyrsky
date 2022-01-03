import { Field, InputType } from "@nestjs/graphql";
import { GraphQLDate } from "graphql-scalars";

@InputType()
export class CreateLeagueInput {
  @Field({ nullable: false })
  name!: string;

  @Field(() => GraphQLDate, { nullable: false })
  startDate!: string;

  @Field(() => GraphQLDate, { nullable: false })
  endDate!: string;
}
