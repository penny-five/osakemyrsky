import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { AuthenticationService } from "./authentication.service";
import { AuthenticationResult } from "./dto/authentication-result.object";
import { SignInInput } from "./dto/sign-in.input";

@Resolver(() => AuthenticationResult)
export class AuthResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => AuthenticationResult)
  async signIn(@Args("signInData") signInData: SignInInput): Promise<AuthenticationResult> {
    const token = await this.authService.signIn(signInData.issuerID, signInData.token);

    return {
      token
    };
  }
}
