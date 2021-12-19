import { registerAs } from "@nestjs/config";

export interface IronConfig {
  secret: string;
}

export const ironConfig = registerAs<IronConfig>("iron", () => ({
  secret: process.env.IRON_SECRET
}));
