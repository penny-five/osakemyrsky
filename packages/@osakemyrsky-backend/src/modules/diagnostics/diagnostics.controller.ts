import { Controller, Get } from "@nestjs/common";

@Controller()
export class DiagnosticsController {
  @Get("/health")
  getHealth() {
    return "ok";
  }
}
