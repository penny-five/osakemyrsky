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
  const { activeLeague, setActiveLeague } = useActiveLeague();

  let activeMembership: Membership | null = null;

  if (user != null) {
    if (activeLeague != null) {
      activeMembership = user.memberships.find(membership => membership.league.id === activeLeague) ?? null;
    }

    if (activeMembership == null) {
      activeMembership = user.memberships.at(0) ?? null;

      if (activeMembership != null) {
        setActiveLeague(activeMembership.league.id);
      }
    }
  }

  return <ActiveMembershipContext.Provider value={{ activeMembership }}>{children}</ActiveMembershipContext.Provider>;
};

export const useActiveMembership = () => {
  return useContext(ActiveMembershipContext);
};
