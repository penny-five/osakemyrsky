import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { ServiceAccountAuthConfig } from "../../config/service-account-auth";

@Injectable()
export class GoogleServiceAccountStrategy extends PassportStrategy(Strategy, "google-service-account-jwt") {
  private readonly serviceAccountAuthConfig: ServiceAccountAuthConfig;

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: "https://accounts.google.com",
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: "https://www.googleapis.com/oauth2/v3/certs"
      }),
      algorithms: ["RS256"]
    } as StrategyOptions);

    this.serviceAccountAuthConfig = configService.get<ServiceAccountAuthConfig>("serviceAccountAuth")!;
  }

  validate(payload: JwtPayload): JwtPayload {
    if (payload.sub != null && this.serviceAccountAuthConfig.authorizedServiceAccounts.includes(payload.sub)) {
      return payload;
    }

    throw new Error(`Unauthorized service account: ${payload.sub || ""}`);
  }
}
