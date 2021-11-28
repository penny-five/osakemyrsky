import Image from "next/image";
import React, { FunctionComponent } from "react";

export type CountryFlagSize = "sm" | "md";

export interface CountryFlagProps {
  countryCode: string;
  size?: CountryFlagSize;
}

const CountryFlag: FunctionComponent<CountryFlagProps> = ({ countryCode, size }) => {
  let width;

  switch (size) {
    case "sm":
      width = 20;
      break;
    case "md":
      width = 26;
      break;
    default:
      throw new Error();
  }

  return (
    <div className="inline-flex flex-shrink-0 border-gray-300 border-1">
      <Image alt={countryCode} src={`/flags/${countryCode.toUpperCase()}.svg`} width={width} height={width * 0.75} />
    </div>
  );
};

CountryFlag.defaultProps = {
  size: "sm"
};

export default CountryFlag;
