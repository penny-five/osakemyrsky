import { FunctionComponent } from "react";

import NavbarDropdown from "./navbar-dropdown";

import { Membership } from "@/types/membership";

export interface NavbarLeagueDropdownProps {
  activeMembership: Membership;
}

const NavbarLeagueDropdown: FunctionComponent<NavbarLeagueDropdownProps> = ({ children, activeMembership }) => {
  return (
    <NavbarDropdown
      content={<span className="flex-grow mx-3 truncate font-semibold select-none">{activeMembership.leagueName}</span>}
      dropdownContent={<ul>{children}</ul>}
    />
  );
};

export default NavbarLeagueDropdown;
