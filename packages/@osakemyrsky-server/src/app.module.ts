import { Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { Request } from "express";
import { LoggerModule } from "nestjs-pino";

import { AuthModule } from "./modules/authentication/authentication.module";
import { firestoreConfig } from "./modules/config/firestore";
import { jwtConfig } from "./modules/config/jwt";
import { DiagnosticsModule } from "./modules/diagnostics/diagnostics.module";
import { FirestoreModule } from "./modules/firestore/firestore.module";
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
          pinoHttp: [
            {
              transport: { target: "pino-pretty", options: { colorize: true } }
            }
          ]
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
      load: [firestoreConfig, jwtConfig]
    }),
    DiagnosticsModule,
    FirestoreModule,
    AuthModule,
    NordnetModule,
    StockModule,
    OrderModule,
    LeagueModule,
    UserModule
  ]
})
export class AppModule {}
