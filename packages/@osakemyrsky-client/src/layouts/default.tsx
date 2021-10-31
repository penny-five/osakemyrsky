import { signOut } from "next-auth/react";
import React, { FunctionComponent } from "react";

import Navbar from "@/components/navbar/navbar";

const DefaultLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <Navbar onSignOut={signOut} />
      <div className="flex flex-grow w-full max-w-screen-desktop border-gray-200 border-l-1 border-r-1">{children}</div>
    </div>
  );
};

export default DefaultLayout;
