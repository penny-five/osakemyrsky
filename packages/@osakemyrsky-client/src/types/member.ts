export interface Member {
  id: string;
  createdAt: string;
  updatedAt: string;
  league: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    picture: string | null;
  };
  companyName: string;
  balanceCents: number;
  balanceUpdatedAt: string;
}
