import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useActiveLeague } from "src/providers/active-league";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { status: sessionStatus } = useSession();

  if (sessionStatus === "unauthenticated") {
    if (!["/leagues", "/leagues/[id]", "/create-league"].includes(router.pathname)) {
      router.push("/leagues");
    }
  }

  const { activeLeague } = useActiveLeague();

  if (sessionStatus === "authenticated" && activeLeague == null) {
    if (!["/leagues", "/leagues/[id]", "/create-league"].includes(router.pathname)) {
      router.push("/leagues");
    }
  }

  return <>{children}</>;
};

export default AuthRedirect;