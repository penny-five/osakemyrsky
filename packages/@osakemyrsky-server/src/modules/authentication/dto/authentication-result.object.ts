import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthenticationResult {
  @Field()
  token!: string;
}
