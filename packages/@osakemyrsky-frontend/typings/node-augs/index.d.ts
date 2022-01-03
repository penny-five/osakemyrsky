/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    API_URL: string;
    PORT: string;
  }
}
