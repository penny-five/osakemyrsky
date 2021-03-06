import { Membership } from "./membership";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  picture: string | null;
  memberships: Membership[];
}
