import { ArgsType, Field, registerEnumType } from "@nestjs/graphql";

import { Paginable } from "../../../common/dto/paginable.args";
import { Searchable } from "../../../common/dto/searchable.args";
import { LeaguesOrderBy } from "../league.service";

registerEnumType(LeaguesOrderBy, { name: "LeaguesOrderBy" });

@ArgsType()
export class GetLeaguesArgs extends Searchable(Paginable()) {
  @Field(() => LeaguesOrderBy, { nullable: true })
  orderBy?: LeaguesOrderBy;
}
