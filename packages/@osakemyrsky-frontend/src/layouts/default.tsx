import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

import { signIn, signOut } from "@/auth/index";
import Navbar from "@/components/navbar/navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isIndex = router.pathname === "/";

  return (
    <div
      className={classNames("flex flex-col items-center min-h-[100vh]", {})}
      style={isIndex ? { background: "linear-gradient(180deg, #1F2527 0%, #263238 400px), #263238" } : {}}
    >
      <Navbar behavior={isIndex ? "sticky" : "normal"} onSignIn={() => signIn("google")} onSignOut={signOut} />
      <div
        className={classNames("flex grow w-full ", {
          "max-w-screen-desktop border-gray-300 border-l-1 border-r-1 pb-8": !isIndex
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
