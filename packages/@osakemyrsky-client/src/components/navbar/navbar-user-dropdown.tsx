import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { FunctionComponent } from "react";

import Avatar from "src/atoms/avatar";
import { User } from "src/types/user";

export interface NavbarUserDropdownProps {
  user: User;
}

const NavbarUserDropdown: FunctionComponent<NavbarUserDropdownProps> = ({ user, children }) => {
  return (
    <div
      className={classNames({
        "group flex flex-row items-center relative w-[220px] border-gray-200 border-1 py-2 px-3 rounded-lg": true,
        "hover:rounded-bl-none hover:rounded-br-none hover: hover:border-b-transparent": true
      })}
    >
      <Avatar />
      <span className="flex-grow truncate mx-3 font-semibold select-none">{user.name}</span>
      <ChevronDownIcon className="w-5 flex-shrink-0 text-gray-300" />
      <div
        className={classNames({
          "absolute top-full mt-[-1px] left-[-1px] right-[-1px] border-gray-200 rounded-bl-lg rounded-br-lg bg-white":
            true,
          "border-t-transparent border-1": true,
          "invisible group-hover:visible": true
        })}
      >
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default NavbarUserDropdown;
