import { registerAs } from "@nestjs/config";

export interface FirestoreConfig {
  ssl: boolean;
  hostUrl?: string;
  hostPort?: number;
}

export const firestoreConfig = registerAs<FirestoreConfig>("firestore", () => ({
  ssl: process.env.NODE_ENV === "production",
  hostUrl: process.env.FIRESTORE_HOST_URL,
  hostPort: process.env.FIRESTORE_HOST_PORT != null ? parseInt(process.env.FIRESTORE_HOST_PORT, 10) : undefined
}));
