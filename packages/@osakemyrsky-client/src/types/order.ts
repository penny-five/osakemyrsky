export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface Order {
  id: string;
  type: OrderType;
  stockSymbol: string;
  stockPriceCents: number;
  stockPriceString: string;
  stockCount: number;
  expirationDate: string;
}
