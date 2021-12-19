import * as Iron from "@hapi/iron";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { IronConfig } from "../config/files/iron";

export interface SessionToken {
  userId: string;
}

/**
 * Service that seals/unseals tokens using @hapi/iron.
 */
@Injectable()
export class TokenService {
  private readonly secret: string;

  constructor(configService: ConfigService) {
    this.secret = configService.get<IronConfig>("iron")!.secret;
  }

  async seal(token: SessionToken) {
    return Iron.seal(token, this.secret, Iron.defaults);
  }

  async unseal(sealedToken: string): Promise<SessionToken> {
    return Iron.unseal(sealedToken, this.secret, Iron.defaults).then(token => token as SessionToken);
  }
}
