import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  size?: BadgeSize;
}

const Badge: FunctionComponent<BadgeProps> = ({ children, size }) => {
  return (
    <span
      className={classNames({
        "rounded-full bg-blue-200": true,
        "w-[2rem] min-w-[2rem] min-h-[2rem]": size === "sm",
        "w-[2.3rem] min-w-[2.3rem] min-h-[2.3rem]": size === "md"
      })}
    >
      {children}
    </span>
  );
};

Badge.defaultProps = {
  size: "md"
};

export default Badge;
