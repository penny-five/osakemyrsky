import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  size?: AvatarSize;
}

const Avatar: FunctionComponent<AvatarProps> = ({ size }) => {
  return (
    <div
      className={classNames({
        "rounded-full bg-gray-200": true,
        "w-8 min-w-[2rem] h-8": size === "sm",
        "w-10 min-w-[2.5rem] h-10": size === "md",
        "w-16 min-w-[4rem] h-16": size === "lg"
      })}
    ></div>
  );
};

Avatar.defaultProps = {
  size: "md"
};

export default Avatar;
