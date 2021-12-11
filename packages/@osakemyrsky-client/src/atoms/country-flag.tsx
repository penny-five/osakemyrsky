import Image from "next/image";
import React from "react";

export type CountryFlagSize = "sm" | "md";

export interface CountryFlagProps {
  countryCode: string;
  size?: CountryFlagSize;
}

const getWidth = (size: CountryFlagSize) => {
  switch (size) {
    case "sm":
      return 20;
    case "md":
      return 26;
    default:
      throw new Error();
  }
};

const CountryFlag = ({ countryCode, size = "sm" }: CountryFlagProps) => {
  const width = getWidth(size);

  return (
    <div className="inline-flex shrink-0 border-gray-300 border-1">
      <Image alt={countryCode} src={`/flags/${countryCode.toUpperCase()}.svg`} width={width} height={width * 0.75} />
    </div>
  );
};

export default CountryFlag;
