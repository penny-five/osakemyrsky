import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import { createContext, useContext, PropsWithChildren } from "react";

import { User } from "src/types/user";

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
        companyName

        league {
          id
          createdAt
          updatedAt
          name
        }
      }
    }
  }
`;

const UserContext = createContext<{ user: User | null; status: "loading" | "unauthenticated" | "authenticated" }>({
  user: null,
  status: "loading"
});

export const UserProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { data: session, status } = useSession();

  const { data } = useQuery<{ me: User }>(GET_ME, {
    context: { session },
    skip: status !== "authenticated"
  });

  return <UserContext.Provider value={{ user: data?.me ?? null, status }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
