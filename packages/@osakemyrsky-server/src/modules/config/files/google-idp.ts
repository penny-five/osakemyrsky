import { registerAs } from "@nestjs/config";

export interface GoogleIdentityProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

export const googleIdentityProviderConfig = registerAs<GoogleIdentityProviderConfig>("google-idp", () => ({
  clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
  clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
  redirectUrl: process.env.AUTH_GOOGLE_CLIENT_REDIRECT_URL
}));
