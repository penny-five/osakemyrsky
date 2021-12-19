import { registerAs } from "@nestjs/config";

export const IronConfig = registerAs("iron", () => ({
  secret: process.env.IRON_SECRET
}));
