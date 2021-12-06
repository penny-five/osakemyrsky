import { TrendingUpIcon, TrendingDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";

export type Trend = "up" | "down";

export interface TrendIconProps {
  trend: Trend;
}

const TrendIcon = ({ trend }: TrendIconProps) => {
  return (
    <span
      className={classNames({
        "flex items-center justify-center p-[7px] rounded-xl border-1 border-gray-500  bg-white": true,
        "text-green-200": trend === "up",
        "text-red-200": trend === "down"
      })}
    >
      {trend === "up" && <TrendingUpIcon width={22} height={22} />}
      {trend === "down" && <TrendingDownIcon width={22} height={22} />}
    </span>
  );
};

export default TrendIcon;
