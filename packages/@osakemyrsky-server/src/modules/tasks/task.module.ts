import { Module } from "@nestjs/common";

import { OrderModule } from "../orders/order.module";

import { TaskController } from "./task.controller";

@Module({
  imports: [OrderModule],
  controllers: [TaskController]
})
export class TaskModule {}
