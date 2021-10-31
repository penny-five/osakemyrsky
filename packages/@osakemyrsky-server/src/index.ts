import * as path from "path";

import { NestFactory } from "@nestjs/core";
import Knex from "knex";
import { Logger } from "nestjs-pino";
import { Model } from "objection";
import promiseRetry from "promise-retry";

import { AppModule } from "./app.module";

const migrateLatest = async (knex: Knex) =>
  promiseRetry(async () => {
    try {
      await knex.migrate.latest();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw err;
    }
  });

const bootrap = async () => {
  const knex = Knex({
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: path.resolve(__dirname, "../migrations")
    }
  });

  await migrateLatest(knex);

  Model.knex(knex);

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT);
};

void bootrap();
