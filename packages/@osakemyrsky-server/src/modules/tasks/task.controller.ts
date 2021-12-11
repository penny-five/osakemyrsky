import { Controller, Get, UseGuards } from "@nestjs/common";

import { GoogleServiceAccountAuthGuard } from "../authentication/guards/google-service-account.jwt.guard";
import { OrderService } from "../orders/order.service";

@Controller()
@UseGuards(GoogleServiceAccountAuthGuard)
export class TaskController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/tasks/process-orders")
  async processOrders() {
    await this.orderService.processOrders();
  }
}
