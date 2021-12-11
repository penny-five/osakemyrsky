import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { JwtConfig } from "../../config/jwt";
import { AuthenticatedUser, AuthenticationToken } from "../authentication.types";

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, "user-jwt") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>("jwt")!.key.public.pem
    } as StrategyOptions);
  }

  validate(token: AuthenticationToken): AuthenticatedUser {
    return {
      token
    };
  }
}
