import { ArgsType, Field, registerEnumType } from "@nestjs/graphql";

import { Paginable } from "../../../common/dto/paginable.args";
import { Searchable } from "../../../common/dto/searchable.args";
import { UsersOrderBy } from "../user.service";

registerEnumType(UsersOrderBy, { name: "UsersOrderBy" });

@ArgsType()
export class GetUsersArgs extends Searchable(Paginable()) {
  @Field(() => UsersOrderBy, { nullable: true })
  orderBy?: UsersOrderBy;
}
