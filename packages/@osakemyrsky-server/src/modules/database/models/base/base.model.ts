import path from "path";

import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLDateTime } from "graphql-scalars";
import { Model, QueryBuilder, ReferenceBuilder } from "objection";

@ObjectType({ isAbstract: true })
export class BaseModel extends Model {
  static readonly WHERE_LIKE = "whereLike";

  static readonly modelPaths = [path.resolve(__dirname, "..")];

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt!: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt!: string;

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static modifiers = {
    [BaseModel.WHERE_LIKE](query: QueryBuilder<Model>, column: ReferenceBuilder, value: string) {
      query.where(column, "ilike", `%${value.toLowerCase()}%`);
    }
  };
}
