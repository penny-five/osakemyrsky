import { createContext, useContext, PropsWithChildren } from "react";

import { useUser } from "./user";

import { useLocalStorage } from "@/hooks/use-local-storage";

const ActiveLeagueContext = createContext<{
  activeLeague: string | null | undefined;
  setActiveLeague: (id: string | null) => void;
}>({
  activeLeague: null,
  setActiveLeague: (_id: string | null) => {
    /* noop */
  }
});

export const ActiveLeagueProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { user } = useUser();
  const [value, setValue] = useLocalStorage("active-league-id");

  if (user != null) {
    if (value == null && user.memberships.length > 0) {
      setValue(user.memberships[0].leagueId);
    }
  }

  return (
    <ActiveLeagueContext.Provider value={{ activeLeague: value, setActiveLeague: setValue }}>
      {children}
    </ActiveLeagueContext.Provider>
  );
};

export const useActiveLeague = () => {
  return useContext(ActiveLeagueContext);
};
