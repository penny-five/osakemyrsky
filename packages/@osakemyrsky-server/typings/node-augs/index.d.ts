declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production";
    FIRESTORE_HOST_URL?: string;
    FIRESTORE_HOST_PORT?: string;
    GOOGLE_CLIENT_ID: string;
    JWT_SIGNING_KEY: string;
  }
}
