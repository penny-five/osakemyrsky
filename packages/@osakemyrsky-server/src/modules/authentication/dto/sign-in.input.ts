import { Field, InputType, registerEnumType } from "@nestjs/graphql";

import { IssuerID } from "../issuers";

registerEnumType(IssuerID, { name: "IssuerID" });

@InputType()
export class SignInInput {
  @Field(() => IssuerID)
  issuerID!: IssuerID;

  @Field()
  token!: string;
}
