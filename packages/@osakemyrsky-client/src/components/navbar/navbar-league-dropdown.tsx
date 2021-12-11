import { ViewGridIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";

import NavbarDropdown from "./navbar-dropdown";

import { Membership } from "@/types/membership";

export interface NavbarLeagueDropdownProps {
  children?: React.ReactNode;
  activeMembership: Membership;
}

const NavbarLeagueDropdown = ({ children, activeMembership }: NavbarLeagueDropdownProps) => {
  return (
    <NavbarDropdown
      content={<span className="grow mx-3 truncate font-semibold select-none">{activeMembership.leagueName}</span>}
      dropdownContent={
        <ul>
          {children}
          <Link href="/leagues" passHref>
            <a
              className={classNames(
                "flex items-center py-3 px-4 truncate select-none cursor-pointer border-t-1 border-gray-300",
                "hover:bg-gray-300 rounded-b-3xl"
              )}
            >
              <ViewGridIcon className="h-5 mr-3 text-black-100" />
              <span>Selaa liigoja</span>
            </a>
          </Link>
        </ul>
      }
    />
  );
};

export default NavbarLeagueDropdown;
