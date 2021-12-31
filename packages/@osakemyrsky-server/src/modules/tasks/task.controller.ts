import { Controller, Post, UseGuards } from "@nestjs/common";

import { GoogleServiceAccountAuthGuard } from "../authentication/guards/google-service-account.jwt.guard";

import { TaskService } from "./task.service";

@Controller("/tasks")
@UseGuards(GoogleServiceAccountAuthGuard)
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
