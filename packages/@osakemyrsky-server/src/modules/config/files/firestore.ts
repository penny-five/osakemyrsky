import { registerAs } from "@nestjs/config";

export const FirestoreConfig = registerAs("firestore", () => ({
  ssl: process.env.NODE_ENV === "production",
  hostUrl: process.env.FIRESTORE_HOST_URL,
  hostPort: process.env.FIRESTORE_HOST_PORT != null ? parseInt(process.env.FIRESTORE_HOST_PORT, 10) : undefined
}));
