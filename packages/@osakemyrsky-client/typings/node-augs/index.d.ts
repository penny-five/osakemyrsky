/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    NEXT_PUBLIC_APOLLO_URL: string;
    NEXT_PUBLIC_APOLLO_URL_INTERNAL: string;
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET: string;
    NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_REDIRECT_URI: string;
    JWT_SIGNING_KEY: string;
  }
}
