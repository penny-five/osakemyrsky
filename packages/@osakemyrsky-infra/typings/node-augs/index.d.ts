declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    GCP_PROJECT_ID: string;
    TF_STATE_BUCKET_NAME: string;
    DOCKER_REPOSITORY_BASE_URL: string;
    DOCKER_IMAGE_TAG: string;
    DOMAIN: string;
  }
}
