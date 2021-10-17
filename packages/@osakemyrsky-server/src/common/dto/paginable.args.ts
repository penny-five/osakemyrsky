import { Type } from "@nestjs/common";
import { Field, ArgsType, Int } from "@nestjs/graphql";

import { EmptyArgs } from "./empty.args";

export const Paginable = <T>(classRef: Type<T> = EmptyArgs as Type<T>) => {
  @ArgsType()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract class PaginableType extends (classRef as any) {
    @Field(() => Int, { nullable: true })
    offset?: number;

    @Field(() => Int, { nullable: true })
    limit?: number;
  }

  return PaginableType as Type<T & PaginableType>;
};
