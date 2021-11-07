import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { AuthenticationService } from "./authentication.service";
import { AuthenticationResult } from "./dto/authentication-result.object";
import { SignInInput } from "./dto/sign-in.input";

@Resolver(() => AuthenticationResult)
export class AuthResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => AuthenticationResult)
  async signIn(@Args("data") data: SignInInput): Promise<AuthenticationResult> {
    const token = await this.authService.signIn(data.issuerID, data.token);

    return {
      token
    };
  }
}
