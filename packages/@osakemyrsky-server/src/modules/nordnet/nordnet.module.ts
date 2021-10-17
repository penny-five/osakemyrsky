import { Module } from "@nestjs/common";

import { NordnetClient } from "./client";

@Module({
  providers: [NordnetClient],
  exports: [NordnetClient]
})
export class NordnetModule {}
