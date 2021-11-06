import { Type } from "@nestjs/common";
import { Field, ArgsType } from "@nestjs/graphql";
import { GraphQLPositiveInt, GraphQLNonNegativeInt } from "graphql-scalars";

import { EmptyArgs } from "./empty.args";

export const Paginable = <T>(classRef: Type<T> = EmptyArgs as Type<T>) => {
  @ArgsType()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract class PaginableType extends (classRef as any) {
    @Field(() => GraphQLNonNegativeInt, { nullable: true })
    offset?: number;

    @Field(() => GraphQLPositiveInt, { nullable: true })
    limit?: number;
  }

  return PaginableType as Type<T & PaginableType>;
};
