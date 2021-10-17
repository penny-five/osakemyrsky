import { OAuth2Client } from "google-auth-library";

import { Issuer } from ".";

export class GoogleIssuer implements Issuer {
  private readonly client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID
    });
  }

  async validateToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });

      const payload = ticket.getPayload();

      if (payload == null) {
        return false;
      }

      const { name, email, picture } = payload;

      if (name == null || email == null) {
        return false;
      }

      return {
        name,
        email,
        picture: picture ?? null
      };
    } catch {
      return false;
    }
  }
}
