import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="inline-flex">
      <Image alt="logo" src="/logo.svg" width={70} height={70} />
    </div>
  );
};

export default Logo;
