import { Member } from "./member";

export interface League {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;

  members?: Member;
}
