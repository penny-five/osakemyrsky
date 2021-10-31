import { signOut } from "next-auth/react";
import React, { FunctionComponent } from "react";

import Navbar from "@/components/navbar/navbar";

const DefaultLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <Navbar onSignOut={signOut} />
      <div className="p-8 w-full max-w-7xl">{children}</div>
    </div>
  );
};

export default DefaultLayout;
