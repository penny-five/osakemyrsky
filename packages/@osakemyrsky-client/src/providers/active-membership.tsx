import { createContext, useContext, PropsWithChildren } from "react";

import { useActiveLeague } from "./active-league";
import { useUser } from "./user";

import { Membership } from "@/types/membership";

const ActiveMembershipContext = createContext<{
  activeMembership: Membership | null;
}>({
  activeMembership: null
});

export const ActiveMembershipProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { user } = useUser();
  const { activeLeague } = useActiveLeague();

  let activeMembership: Membership | null = null;

  if (user != null && activeLeague != null) {
    activeMembership = user.memberships.find(membership => membership.leagueId === activeLeague) ?? null;
  }

  return <ActiveMembershipContext.Provider value={{ activeMembership }}>{children}</ActiveMembershipContext.Provider>;
};

export const useActiveMembership = () => {
  return useContext(ActiveMembershipContext);
};
