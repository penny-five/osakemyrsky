import React from "react";

import { signIn, signOut } from "@/auth/index";
import Navbar from "@/components/navbar/navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <Navbar onSignIn={() => signIn("google")} onSignOut={signOut} />
      <div className="flex grow w-full max-w-screen-desktop border-gray-300 border-l-1 border-r-1 pb-8">{children}</div>
    </div>
  );
};

export default DefaultLayout;
