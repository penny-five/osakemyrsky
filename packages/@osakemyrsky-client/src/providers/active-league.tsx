import { useState, createContext, useContext, PropsWithChildren } from "react";

import { isBrowser } from "src/utils/next";

const LOCAL_STORAGE_KEY = "activeLeagueId";

const ActiveLeagueContext = createContext<{
  activeLeagueId: string | null;
  setActiveLeagueId: (id: string) => void;
}>({
  activeLeagueId: null,
  setActiveLeagueId: (_id: string) => {
    /* noop */
  }
});

export const ActiveLeagueProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [value, setValue] = useState<string | null | undefined>(undefined);

  if (value === undefined && isBrowser()) {
    setValue(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  const setActiveLeagueId = (id: string) => {
    if (isBrowser()) {
      localStorage.setItem(LOCAL_STORAGE_KEY, id);
    }
    setValue(id);
  };

  return (
    <ActiveLeagueContext.Provider value={{ activeLeagueId: value!, setActiveLeagueId }}>
      {children}
    </ActiveLeagueContext.Provider>
  );
};

export const useActiveLeague = () => {
  return useContext(ActiveLeagueContext);
};
