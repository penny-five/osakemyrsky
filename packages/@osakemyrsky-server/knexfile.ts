import path from "path";

import { Config } from "knex";

const config: Config = {
  client: "pg",
  migrations: {
    extension: process.env.NODE_ENV === "production" ? "js" : "ts",
    stub: path.resolve(__dirname, "migrations", "migration.ts.stub")
  }
};

export default config;
