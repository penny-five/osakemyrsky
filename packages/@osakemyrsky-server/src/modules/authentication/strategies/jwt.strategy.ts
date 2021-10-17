import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { JwtConfig } from "../../config/jwt";
import { AuthenticatedUser, AuthenticationToken } from "../authentication.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<JwtConfig>("jwt")!.key.public.pem
    } as StrategyOptions);
  }

  validate(token: AuthenticationToken): AuthenticatedUser {
    return {
      token
    };
  }
}
