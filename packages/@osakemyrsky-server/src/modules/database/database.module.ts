import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { knexSnakeCaseMappers } from "objection";

import { DatabaseConfig } from "../config/database";

import { League } from "./models/league.model";
import { Member } from "./models/member.model";
import { Order } from "./models/order.model";
import { User } from "./models/user.model";
import "./pg.config";

@Global()
@Module({
  imports: [
    ObjectionModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          client: "pg",
          connection: configService.get<DatabaseConfig>("database")!.connectionString,
          ...knexSnakeCaseMappers()
        }
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    ObjectionModule.forFeature([League, Member, Order, User])
  ],
  exports: [ObjectionModule]
})
export class DatabaseModule {}
