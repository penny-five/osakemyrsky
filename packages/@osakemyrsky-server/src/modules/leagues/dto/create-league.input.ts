import { Field, InputType, registerEnumType } from "@nestjs/graphql";

import { LeaguesOrderBy } from "../league.service";

registerEnumType(LeaguesOrderBy, { name: "LeaguesOrderBy" });

@InputType()
export class CreateLeagueInput {
  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  startDate!: string;

  @Field({ nullable: false })
  endDate!: string;
}
