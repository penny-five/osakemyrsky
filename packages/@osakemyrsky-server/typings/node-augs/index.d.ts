declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production";
    IRON_SECRET: string;
    FIRESTORE_HOST_URL?: string;
    FIRESTORE_HOST_PORT?: string;
    AUTH_GOOGLE_CLIENT_ID: string;
    AUTH_GOOGLE_CLIENT_SECRET: string;
    AUTH_GOOGLE_CLIENT_REDIRECT_URL: string;
    /**
     * Comma separated list of service accounts that should be granted access to routes
     * guarded by `GoogleServiceAccountAuthGuard`.
     */
    AUTHORIZED_GOOGLE_SERVICE_ACCOUNTS: string;
  }
}
