declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PG_CONNECTION_STRING: string;
    PORT: string;
    GOOGLE_CLIENT_ID: string;
    JWT_SIGNING_KEY: string;
  }
}
