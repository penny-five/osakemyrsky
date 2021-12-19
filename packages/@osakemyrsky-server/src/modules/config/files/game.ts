import { registerAs } from "@nestjs/config";

export interface GameConfig {
  initialDepositEuros: number;
}

export const gameConfig = registerAs<GameConfig>("game", () => ({
  initialDepositEuros: 1_000_000
}));
