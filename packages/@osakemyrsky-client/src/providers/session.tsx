import Cookies from "js-cookie";
import { createContext, useContext, PropsWithChildren } from "react";

export interface Session {
  token: string;
}

const SessionContext = createContext<Session | undefined>(undefined);

export const SessionProvider = ({ children }: PropsWithChildren<unknown>) => {
  const sessionCookie = Cookies.get("session");

  const session: Session | undefined = sessionCookie != null ? { token: sessionCookie } : undefined;

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  return useContext(SessionContext);
};
