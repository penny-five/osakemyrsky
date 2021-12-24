import { Request } from "express";
import { Issuer, BaseClient } from "openid-client";

export interface IdentityProviderConfig {
  /**
   * Unique ID for this identity provider (e.g. `facebook`).
   */
  id: string;
  /**
   * OpenID Provider Issuer discovery url.
   */
  discoveryUrl: string;
  /**
   * OAuth client id.
   */
  clientId: string;
  /**
   * OAuth client secret.
   */
  clientSecret: string;
  /**
   * OAuth redirect url.
   */
  redirectUrl: string;
}

export interface UserInfo {
  sub: string;
  name: string;
  email: string | null;
  picture: string | null;
}

/**
 * OpenID compliant identity provider.
 */
export class IdentityProvider {
  private constructor(readonly config: IdentityProviderConfig, private readonly client: BaseClient) {}

  get id() {
    return this.config.id;
  }

  static async create(config: IdentityProviderConfig) {
    const issuer = await Issuer.discover(config.discoveryUrl);
    const client = new issuer.Client({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uris: [config.redirectUrl]
    });

    return new IdentityProvider(config, client);
  }

  /**
   * Creates authorization url that can be used to initiate authorization code flow
   * with the identity provider.
   */
  createAuthorizationUrl() {
    return this.client.authorizationUrl({
      scope: "openid profile email"
    });
  }

  /**
   * Handles redirection step in authorization code flow. Retrieves user info using
   * the UserInfo endpoint.
   *
   * @param req HTTP request
   * @returns User info
   */
  async handleRedirect(req: Request): Promise<UserInfo> {
    const params = this.client.callbackParams(req);

    const tokens = await this.client.callback(this.config.redirectUrl, params);

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
}
