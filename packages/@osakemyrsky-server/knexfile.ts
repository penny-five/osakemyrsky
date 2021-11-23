import path from "path";

import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  migrations: {
    extension: process.env.NODE_ENV === "production" ? "js" : "ts",
    stub: path.resolve(__dirname, "migrations", "migration.ts.stub")
  }
};

export default config;
