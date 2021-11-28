declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PG_CONNECTION_STRING: string;
    PORT: string;
    FIRESTORE_HOST_URL?: string;
    FIRESTORE_HOST_PORT?: string;
    GOOGLE_CLIENT_ID: string;
    JWT_SIGNING_KEY: string;
  }
}
