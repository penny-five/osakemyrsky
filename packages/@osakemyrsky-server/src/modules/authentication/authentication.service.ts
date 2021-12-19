import { Inject, Injectable } from "@nestjs/common";
import { Request } from "express";

import { User } from "../firestore/models/user.model";
import { UserService } from "../users/user.service";

import { IdentityProvider, UserInfo } from "./idp";
import { TokenService } from "./token.service";

@Injectable()
export class AuthenticationService {
  private readonly identityProviders: Map<string, IdentityProvider> = new Map();

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @Inject("google-idp") googleIdentityProvider: IdentityProvider
  ) {
    this.identityProviders.set(googleIdentityProvider.id, googleIdentityProvider);
  }

  isSupportedIdentityProvider(idp: string) {
    return this.identityProviders.get(idp) != null;
  }

  createAuthorizationUrl(idp: string) {
    const identityProvider = this.identityProviders.get(idp)!;

    return identityProvider.createAuthorizationUrl();
  }

  async handleRedirect(idp: string, req: Request) {
    const identityProvider = this.identityProviders.get(idp)!;

    const userInfo = await identityProvider.handleRedirect(req);

    return this.signIn(userInfo);
  }

  /**
   * Signs in a user.
   *
   * a) If the user is signing in the first time, a new user is created.
   *
   * b) If the user is a returning user, the user is updated with fresh data from UserInfo.
   *
   *
   * @param userInfo User info returned from IDP
   * @returns Sealed session token
   */
  async signIn(userInfo: UserInfo): Promise<string> {
    let user: User | undefined = await this.userService.findUserBySub(userInfo.sub);

    if (user == null) {
      user = await this.userService.createUser({
        sub: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      });
    } else {
      await this.userService.updateUser(user.id!, {
        name: userInfo.name,
        picture: userInfo.picture,
        email: userInfo.email
      });
    }

    const token = await this.tokenService.seal({
      userId: user.id!
    });

    return token;
  }
}
