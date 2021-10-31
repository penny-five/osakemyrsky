import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import { useDefaultLeague } from "src/providers/default-league";

const LeagueSelectionRedirect: FunctionComponent = ({ children }) => {
  const router = useRouter();

  const { defaultLeagueId } = useDefaultLeague();

  const { status: sessionStatus } = useSession();

  if (sessionStatus === "authenticated" && defaultLeagueId == null) {
    if (!["/leagues", "/league/[id]", "/create-league"].includes(router.pathname)) {
      router.push("/leagues");
    }
  }

  return <>{children}</>;
};

export default LeagueSelectionRedirect;
