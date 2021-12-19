import { useQuery, gql } from "@apollo/client";
import { createContext, useContext, PropsWithChildren } from "react";

import { useSession } from "./session";

import { User } from "@/types/user";

const GET_ME = gql`
  query GetMe {
    me {
      id
      createdAt
      updatedAt
      name
      picture

      memberships {
        id
        createdAt
        updatedAt
        leagueId
        leagueName
        companyName
      }
    }
  }
`;

export type UserStatus = "loading" | "unauthenticated" | "authenticated";

const UserContext = createContext<{ user: User | null; status: UserStatus }>({
  user: null,
  status: "loading"
});

export const UserProvider = ({ children }: PropsWithChildren<unknown>) => {
  const session = useSession();

  const { data, loading } = useQuery<{ me: User }>(GET_ME, {
    context: { session },
    skip: session == null
  });

  let status: UserStatus;

  if (session == null) {
    status = "unauthenticated";
  } else if (loading) {
    status = "loading";
  } else {
    status = "authenticated";
  }

  return <UserContext.Provider value={{ user: data?.me ?? null, status }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
