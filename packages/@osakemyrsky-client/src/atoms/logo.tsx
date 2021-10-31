import Image from "next/image";
import React, { FunctionComponent } from "react";

const Logo: FunctionComponent = () => {
  return (
    <div className="inline-flex">
      <Image alt="logo" src="/logo.svg" width={60} height={60} />
    </div>
  );
};

export default Logo;
