export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface Transaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: TransactionType;
  stockSymbol: string;
  count: number;
  priceCents: number;
}
