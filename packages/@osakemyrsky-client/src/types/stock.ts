export enum StockTradingStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  UNKNOWN = "UNKNOWN"
}

export interface Stock {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  symbol: string;
  exchangeCountry: string;
  price: number | null;
  priceDiff: number | null;
  priceDiffPct: number | null;
  tradingStatus: StockTradingStatus | null;
}
