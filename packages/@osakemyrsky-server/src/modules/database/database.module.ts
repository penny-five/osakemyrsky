import * as path from "path";

import { DynamicModule, Global, Module } from "@nestjs/common";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { knex, Knex } from "knex";
import { Model, knexSnakeCaseMappers } from "objection";
import promiseRetry from "promise-retry";

import { League } from "./models/league.model";
import { Member } from "./models/member.model";
import { Order } from "./models/order.model";
import { User } from "./models/user.model";
import "./pg.config";

export interface DatabaseModuleOptions {
  connectionString: string;
}

@Global()
@Module({})
export class DatabaseModule {
  static async forRootAsync(options: DatabaseModuleOptions): Promise<DynamicModule> {
    const kn = knex({
      client: "pg",
      connection: options.connectionString,
      migrations: {
        directory: path.resolve(__dirname, "../../../migrations")
      }
    });

    await DatabaseModule.migrateLatest(kn);

    Model.knex(kn);

    return {
      module: DatabaseModule,
      imports: [
        ObjectionModule.register({
          config: {
            client: "pg",
            connection: options.connectionString,
            ...knexSnakeCaseMappers()
          }
        }),
        ObjectionModule.forFeature([League, Member, Order, User])
      ],
      exports: [ObjectionModule]
    };
  }

  private static async migrateLatest(kn: Knex) {
    await promiseRetry(async () => {
      try {
        await kn.migrate.latest();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        throw err;
      }
    });
  }
}
