export enum OrderType {
  BUY = "BUY",
  SELL = "SELL"
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED"
}

export interface Order {
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
  stockPriceCents: number;
  stockPriceString: string;
  stockCount: number;
  expirationDate: string;
  type: OrderType;
  status: OrderStatus;
}
