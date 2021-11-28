import { FunctionComponent } from "react";

import NavbarDropdown from "./navbar-dropdown";

import Avatar from "src/atoms/avatar";
import { User } from "src/types/user";

export interface NavbarUserDropdownProps {
  user: User;
}

const NavbarUserDropdown: FunctionComponent<NavbarUserDropdownProps> = ({ user, children }) => {
  return (
    <NavbarDropdown
      content={
        <div className="flex items-center">
          <Avatar url={user.picture} />
          <span className="flex-grow truncate mx-3 font-semibold select-none">{user.name}</span>
        </div>
      }
      dropdownContent={<ul>{children}</ul>}
    />
  );
};

export default NavbarUserDropdown;
