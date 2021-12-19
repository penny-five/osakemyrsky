import { registerAs } from "@nestjs/config";

export const ServiceAccountAuthConfig = registerAs("serviceAccountAuth", () => ({
  authorizedServiceAccounts: process.env.AUTHORIZED_GOOGLE_SERVICE_ACCOUNTS.split(",")
}));
