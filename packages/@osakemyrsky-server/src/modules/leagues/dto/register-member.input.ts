import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterMemberInput {
  @Field({ nullable: false })
  leagueId!: string;

  @Field({ nullable: false })
  userId!: string;

  @Field({ nullable: false })
  companyName!: string;
}
