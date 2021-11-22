import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  url?: string | null;
  size?: AvatarSize;
}

const Avatar: FunctionComponent<AvatarProps> = ({ url, size }) => {
  return (
    <div
      className={classNames({
        "rounded-full bg-gray-200 bg-cover": true,
        "w-[2rem] min-w-[2rem] min-h-[2rem]": size === "sm",
        "w-[2.3rem] min-w-[2.3rem] min-h-[2.3rem]": size === "md",
        "w-[4rem] min-w-[4rem] min-h-[4rem]": size === "lg"
      })}
      style={{ backgroundImage: url != null ? `url(${url})` : "" }}
    ></div>
  );
};

Avatar.defaultProps = {
  size: "md"
};

export default Avatar;
