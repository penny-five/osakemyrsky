import { createContext, useContext, PropsWithChildren } from "react";

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
  const [value, setValue] = useLocalStorage("active-league-id");

  return (
    <ActiveLeagueContext.Provider value={{ activeLeague: value, setActiveLeague: setValue }}>
      {children}
    </ActiveLeagueContext.Provider>
  );
};

export const useActiveLeague = () => {
  return useContext(ActiveLeagueContext);
};
