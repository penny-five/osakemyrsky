import { League } from "./league";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;

  leagues: League[];
}
