import { registerAs } from "@nestjs/config";

export const IronConfig = registerAs("iron", () => ({
  password: process.env.IRON_PASSWORD
}));
