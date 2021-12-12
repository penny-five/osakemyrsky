export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface Transaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  member: {
    id: string;
    userId: string;
    name: string;
    picture: string | null;
    companyName: string;
  };
  stock: {
    name: string;
    symbol: string;
  };
  count: number;
  unitPriceCents: number;
  type: TransactionType;
}
