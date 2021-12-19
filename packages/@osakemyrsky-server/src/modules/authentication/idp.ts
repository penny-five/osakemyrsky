import { Request } from "express";
import { Issuer, BaseClient } from "openid-client";

export interface IdentityProviderConfig {
  id: string;
  discoveryUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

export interface UserInfo {
  sub: string;
  name: string;
  email: string | null;
  picture: string | null;
}

export class IdentityProvider {
  private constructor(readonly id: string, readonly redirectUrl: string, private readonly client: BaseClient) {}

  createAuthorizationUrl() {
    return this.client.authorizationUrl({
      scope: "openid profile email"
    });
  }

  async handleRedirect(req: Request): Promise<UserInfo> {
    const params = this.client.callbackParams(req);

    const tokens = await this.client.callback(this.redirectUrl, params);

    if (tokens.access_token == null) {
      throw new Error();
    }

    const userInfo = await this.client.userinfo(tokens.access_token);

    return {
      sub: userInfo.sub,
      name: userInfo.name ?? "Unknown",
      email: userInfo.email ?? null,
      picture: userInfo.picture ?? null
    };
  }

  static async create(config: IdentityProviderConfig) {
    const issuer = await Issuer.discover(config.discoveryUrl);
    const client = new issuer.Client({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uris: [config.redirectUrl]
    });

    return new IdentityProvider(config.id, config.redirectUrl, client);
  }
}
