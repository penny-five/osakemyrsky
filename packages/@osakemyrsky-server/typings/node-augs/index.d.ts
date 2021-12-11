declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production";
    FIRESTORE_HOST_URL?: string;
    FIRESTORE_HOST_PORT?: string;
    GOOGLE_CLIENT_ID: string;
    /**
     * Comma separeted list of service accounts that should be granted access to routes
     * guarded by `GoogleServiceAccountAuthGuard`.
     */
    AUTHORIZED_GOOGLE_SERVICE_ACCOUNTS: string;
    JWT_SIGNING_KEY: string;
  }
}
