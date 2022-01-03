import { Controller, Post } from "@nestjs/common";

import { TaskService } from "./task.service";

@Controller("/tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("/process-orders")
  async processOrders() {
    await this.taskService.processOrders();
  }

  @Post("/update-balances")
  async updateBalances() {
    await this.taskService.updateBalances();
  }
}
