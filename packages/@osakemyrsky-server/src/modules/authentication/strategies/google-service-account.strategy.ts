import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions as JwtStrategyOptions } from "passport-jwt";

import { ServiceAccountAuthConfig } from "../../config/files/service-account-auth";

@Injectable()
export class GoogleServiceAccountStrategy extends PassportStrategy(JwtStrategy, "google-service-account-jwt") {
  constructor(
    @Inject(ServiceAccountAuthConfig.KEY)
    private readonly config: ConfigType<typeof ServiceAccountAuthConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: process.env.NODE_ENV === "development",
      issuer: "https://accounts.google.com",
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: "https://www.googleapis.com/oauth2/v3/certs"
      }),
      algorithms: ["RS256"]
    } as JwtStrategyOptions);
  }

  validate(payload: JwtPayload): JwtPayload {
    if (payload.sub != null && this.config.authorizedServiceAccounts.includes(payload.sub)) {
      return payload;
    }

    throw new Error(`Unauthorized service account: ${payload.sub || ""}`);
  }
}
