import { Member } from "./member";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  memberships: Member[];
}
