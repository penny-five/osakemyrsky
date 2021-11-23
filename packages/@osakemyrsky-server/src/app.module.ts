import { Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { Request } from "express";
import { LoggerModule } from "nestjs-pino";

import { AuthModule } from "./modules/authentication/authentication.module";
import { databaseConfig } from "./modules/config/database";
import { jwtConfig } from "./modules/config/jwt";
import { DatabaseModule } from "./modules/database/database.module";
import { DiagnosticsModule } from "./modules/diagnostics/diagnostics.module";
import { LeagueModule } from "./modules/leagues/league.module";
import { NordnetModule } from "./modules/nordnet/nordnet.module";
import { OrderModule } from "./modules/orders/order.module";
import { StockModule } from "./modules/stocks/stock.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory() {
        if (process.env.NODE_ENV === "production") {
          return {
            pinoHttp: [{ redact: ["req.headers.authorization"] }],
            exclude: [{ method: RequestMethod.ALL, path: "/health" }]
          };
        }

        return {
          pinoHttp: [{ prettyPrint: true }]
        };
      }
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV === "development",
      autoSchemaFile: "schema.gql",
      context: (ctx: { req: Request }) => ({ headers: ctx.req.headers })
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [databaseConfig, jwtConfig]
    }),
    DiagnosticsModule,
    DatabaseModule.forRootAsync({
      connectionString: process.env.PG_CONNECTION_STRING
    }),
    AuthModule,
    NordnetModule,
    StockModule,
    OrderModule,
    LeagueModule,
    UserModule
  ]
})
export class AppModule {}
