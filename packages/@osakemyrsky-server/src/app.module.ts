import { Module, RequestMethod } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { Request } from "express";
import { LoggerModule } from "nestjs-pino";

import { AuthModule } from "./modules/authentication/authentication.module";
import { ConfigModule } from "./modules/config/config.module";
import { DiagnosticsModule } from "./modules/diagnostics/diagnostics.module";
import { LeagueModule } from "./modules/leagues/league.module";
import { OrderModule } from "./modules/orders/order.module";
import { StockModule } from "./modules/stocks/stock.module";
import { TaskModule } from "./modules/tasks/task.module";
import { TransactionModule } from "./modules/transactions/transaction.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory() {
        if (process.env.NODE_ENV === "production") {
          return {
            pinoHttp: { redact: ["req.headers.authorization", "req.headers.cookie"] },
            exclude: [{ method: RequestMethod.ALL, path: "/health" }]
          };
        }

        return {
          pinoHttp: {
            transport: { target: "pino-pretty", options: { colorize: true } }
          }
        };
      }
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV === "development",
      autoSchemaFile: "schema.gql",
      context: (ctx: { req: Request }) => ({ headers: ctx.req.headers })
    }),
    ConfigModule,
    DiagnosticsModule,
    AuthModule,
    LeagueModule,
    OrderModule,
    TransactionModule,
    StockModule,
    UserModule,
    TaskModule
  ]
})
export class AppModule {}
