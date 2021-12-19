import { registerAs } from "@nestjs/config";

export const GoogleIdentityProviderConfig = registerAs("google-idp", () => ({
  clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
  clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
  redirectUrl: process.env.AUTH_GOOGLE_CLIENT_REDIRECT_URL
}));
