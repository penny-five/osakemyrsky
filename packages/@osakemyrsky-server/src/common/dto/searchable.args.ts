import { Type } from "@nestjs/common";
import { Field, ArgsType } from "@nestjs/graphql";

import { EmptyArgs } from "./empty.args";

export const Searchable = <T>(classRef: Type<T> = EmptyArgs as Type<T>) => {
  @ArgsType()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract class SearchableType extends (classRef as any) {
    @Field(() => String, { nullable: true })
    search?: string;
  }

  return SearchableType as Type<T & SearchableType>;
};
