import * as Iron from "@hapi/iron";
import { Injectable } from "@nestjs/common";

export interface SessionToken {
  userId: string;
}

/**
 * Service that seals/unseals session tokens using @hapi/iron.
 */
@Injectable()
export class TokenService {
  constructor(private readonly secret: string) {}

  async seal(token: SessionToken) {
    return Iron.seal(token, this.secret, Iron.defaults);
  }

  async unseal(sealedToken: string): Promise<SessionToken> {
    return Iron.unseal(sealedToken, this.secret, Iron.defaults).then(token => token as SessionToken);
  }
}
