import { registerAs } from "@nestjs/config";

export interface DatabaseConfig {
  connectionString: string;
}

export const databaseConfig = registerAs<DatabaseConfig>("database", () => ({
  connectionString: process.env.PG_CONNECTION_STRING
}));
