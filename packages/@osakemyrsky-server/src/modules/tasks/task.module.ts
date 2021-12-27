import { Module } from "@nestjs/common";

import { LeagueModule } from "../leagues/league.module";
import { OrderModule } from "../orders/order.module";

import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [OrderModule, LeagueModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
