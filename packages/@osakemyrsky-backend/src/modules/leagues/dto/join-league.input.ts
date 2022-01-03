import { Field, InputType } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";

@InputType()
export class JoinLeagueInput {
  @Field(() => GraphQLUUID, { nullable: false })
  leagueId!: string;

  @Field({ nullable: false })
  companyName!: string;
}
