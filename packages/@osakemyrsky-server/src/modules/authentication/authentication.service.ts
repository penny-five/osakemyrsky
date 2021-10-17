import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../users/user.service";

import { Issuer, IssuerID } from "./issuers";
import { GoogleIssuer } from "./issuers/google";

@Injectable()
export class AuthenticationService {
  private readonly issuers: Map<IssuerID, Issuer> = new Map();

  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {
    this.issuers.set(IssuerID.GOOGLE, new GoogleIssuer());
  }

  /**
   * Signs in a user.
   *
   * @param issuerId The issuer ID.
   * @param token ID token from the sign in provider.
   * @returns Signed JWT token.
   */
  async signIn(issuerID: IssuerID, issuerToken: string): Promise<string> {
    const issuer = this.issuers.get(issuerID);

    if (issuer == null) {
      throw new Error(`Unsupported sign-in token issuer: "${issuerID}"`);
    }

    const userInfo = await issuer.validateToken(issuerToken);

    if (!userInfo) {
      throw new Error("Invalid token");
    }

    let user = await this.userService.findByEmail(userInfo.email);

    if (user == null) {
      user = await this.userService.createAndFetchOne({
        name: userInfo.name,
        email: userInfo.email
      });
    } else {
      await this.userService.updateOne(user.id, { name: userInfo.name });
    }

    const token = this.jwtService.sign(
      {},
      {
        expiresIn: "1h",
        subject: user.id
      }
    );

    return token;
  }
}
