import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import { useActiveLeague } from "src/providers/active-league";

const LeagueSelectionRedirect: FunctionComponent = ({ children }) => {
  const router = useRouter();

  const { activeLeague } = useActiveLeague();

  const { status: sessionStatus } = useSession();

  if (sessionStatus === "authenticated" && activeLeague == null) {
    if (!["/leagues", "/leagues/[id]", "/create-league"].includes(router.pathname)) {
      router.push("/leagues");
    }
  }

  return <>{children}</>;
};

export default LeagueSelectionRedirect;
