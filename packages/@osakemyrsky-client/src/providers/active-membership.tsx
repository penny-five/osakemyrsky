import { createContext, useContext, PropsWithChildren } from "react";

import { useActiveLeague } from "./active-league";
import { useUser } from "./user";

import { Member } from "@/types/member";

const ActiveMembershipContext = createContext<{
  activeMembership: Member | null;
}>({
  activeMembership: null
});

export const ActiveMembershipProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { user } = useUser();
  const { activeLeagueId } = useActiveLeague();

  let activeMembership: Member | null = null;

  if (user != null && activeLeagueId != null) {
    activeMembership = user.memberships.find(membership => membership.league.id === activeLeagueId) ?? null;
  }

  return <ActiveMembershipContext.Provider value={{ activeMembership }}>{children}</ActiveMembershipContext.Provider>;
};

export const useActiveMembership = () => {
  return useContext(ActiveMembershipContext);
};
