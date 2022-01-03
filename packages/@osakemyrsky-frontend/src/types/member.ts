import { MemberStock } from "./member-stock";
import { Order } from "./order";

export interface MemberLeague {
  id: string;
  name: string;
}

export interface MemberUser {
  id: string;
  name: string;
  picture: string | null;
}

export interface MemberBalanceHistoryEntry {
  date: string;
  value: number;
}

export interface Member {
  id: string;
  createdAt: string;
  updatedAt: string;
  league: MemberLeague;
  user: MemberUser;
  companyName: string;
  balanceCents: number;
  balanceUpdatedAt: string;
  balanceHistory: MemberBalanceHistoryEntry[];
  orders: Order[];
  stocks: MemberStock[];
}
