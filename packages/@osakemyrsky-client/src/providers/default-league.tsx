import { useState, createContext, useContext, PropsWithChildren } from "react";

import { isBrowser } from "src/utils/next";

const LOCAL_STORAGE_KEY = "activeLeagueId";

const DefaultLeagueContext = createContext<{
  defaultLeagueId: string | null;
  setDefaultLeagueId: (id: string) => void;
}>({
  defaultLeagueId: null,
  setDefaultLeagueId: (_id: string) => {
    /* noop */
  }
});

export const DefaultLeagueProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [value, setValue] = useState<string | null | undefined>(undefined);

  if (value === undefined && isBrowser()) {
    setValue(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  const setDefaultLeagueId = (id: string) => {
    if (isBrowser()) {
      localStorage.setItem(LOCAL_STORAGE_KEY, id);
    }
    setValue(id);
  };

  return (
    <DefaultLeagueContext.Provider value={{ defaultLeagueId: value!, setDefaultLeagueId }}>
      {children}
    </DefaultLeagueContext.Provider>
  );
};

export const useDefaultLeague = () => {
  return useContext(DefaultLeagueContext);
};
