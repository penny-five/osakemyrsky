import { registerAs } from "@nestjs/config";

export const GameConfig = registerAs("game", () => ({
  initialDepositEuros: 1_000_000
}));
