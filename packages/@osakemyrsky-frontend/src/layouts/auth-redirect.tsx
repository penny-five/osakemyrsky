import { useRouter } from "next/router";

import { useActiveLeague } from "@/providers/active-league";
import { useSession } from "@/providers/session";
import { isBrowser } from "@/utils/nextjs";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const session = useSession();

  const { activeLeague } = useActiveLeague();

  if (isBrowser()) {
    if (session == null) {
      if (router.pathname !== "/") {
        void router.push("/");
      }
    } else if (activeLeague == null) {
      if (!["/league-browser", "/leagues/[id]"].includes(router.pathname)) {
        void router.push("/leagues");
      }
    } else {
      if (router.pathname === "/") {
        void router.push("/leagues");
      }
    }
  }

  return <>{children}</>;
};

export default AuthRedirect;
