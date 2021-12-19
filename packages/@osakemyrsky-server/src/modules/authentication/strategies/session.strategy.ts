import { IncomingMessage } from "http";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as CustomStrategy } from "passport-custom";
import { Cookie } from "tough-cookie";

import { SessionToken, TokenService } from "../token.service";

@Injectable()
export class SessionStrategy extends PassportStrategy(CustomStrategy, "session") {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  async validate(req: IncomingMessage): Promise<SessionToken> {
    if (req.headers.cookie == null) {
      throw new UnauthorizedException();
    }

    const cookies = (req.headers.cookie || "").split(";").map(cookie => Cookie.parse(cookie));

    for (const cookie of cookies) {
      if (cookie?.key === "session") {
        return this.tokenService.unseal(cookie.value);
      }
    }

    throw new UnauthorizedException();
  }
}
