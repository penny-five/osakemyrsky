import classNames from "classnames";
import React from "react";

export type BadgeColor = "gray" | "blue";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  children?: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
}

const Badge = ({ children, color = "blue", size = "md" }: BadgeProps) => {
  return (
    <span
      className={classNames({
        "rounded-full bg-blue-200 text-white": true,
        "px-2 py-1 w-[2rem] min-w-[2rem] min-h-[2rem] font-normal text-sm": size === "sm",
        "px-3 py-2 w-[2.3rem] min-w-[2.3rem] min-h-[2.3rem] font-bold text-sm": size === "md",
        "bg-blue-200 text-white": color === "blue",
        "bg-gray-600 text-white": color === "gray"
      })}
    >
      {children}
    </span>
  );
};

export default Badge;
