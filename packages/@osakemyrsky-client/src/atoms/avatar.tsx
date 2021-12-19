import classNames from "classnames";
import React from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  url?: string | null;
  size?: AvatarSize;
  hightlight?: boolean;
}

const Avatar = ({ url, size = "md", hightlight = false }: AvatarProps) => {
  return (
    <div
      className={classNames("rounded-full bg-gray-200 bg-cover", {
        "w-[2rem] min-w-[2rem] min-h-[2rem]": size === "sm",
        "w-[2.3rem] min-w-[2.3rem] min-h-[2.3rem]": size === "md",
        "w-[4rem] min-w-[4rem] min-h-[4rem]": size === "lg",
        "ring-2 ring-offset-2 ring-blue-200": hightlight
      })}
      style={{ backgroundImage: url != null ? `url(${url})` : "" }}
    ></div>
  );
};

export default Avatar;
