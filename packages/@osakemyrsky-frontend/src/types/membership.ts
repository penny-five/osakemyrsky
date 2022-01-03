export interface Membership {
  id: string;
  createdAt: string;
  updatedAt: string;
  league: {
    id: string;
    name: string;
  };
  member: {
    id: string;
    companyName: string;
  };
}
