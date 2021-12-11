import { registerAs } from "@nestjs/config";

export interface ServiceAccountAuthConfig {
  authorizedServiceAccounts: string[];
}

export const serviceAccountAuthConfig = registerAs<ServiceAccountAuthConfig>("serviceAccountAuth", () => ({
  authorizedServiceAccounts: process.env.AUTHORIZED_GOOGLE_SERVICE_ACCOUNTS.split(",")
}));
