import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { FunctionComponent, useState } from "react";

import NavbarLeagueSelectorItem from "./navbar-league-selector-item";

import { Membership } from "@/types/membership";

export interface NavbarLeagueSelectorProps {
  activeMembership: Membership;
  memberships: Membership[];
  onSelect: (leagueId: string) => void;
}

const NavbarLeagueSelector: FunctionComponent<NavbarLeagueSelectorProps> = ({
  activeMembership,
  memberships,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectLeague = (leagueId: string) => {
    setIsOpen(false);
    onSelect(leagueId);
  };

  return (
    <div
      className={classNames({
        "group flex flex-row items-center relative w-[220px] h-[55px] border-gray-200 border-1 px-3 rounded-xl": true,
        "hover:rounded-bl-none hover:rounded-br-none hover: hover:border-b-transparent": true
      })}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="flex-grow mx-3 truncate font-semibold select-none">{activeMembership.leagueName}</span>
      <ChevronDownIcon className="w-5 flex-shrink-0 text-gray-300 transition-transform group-hover:rotate-180" />
      <div
        className={classNames({
          "absolute top-full mt-[-1px] left-[-1px] right-[-1px] bg-white shadow-lg": true,
          "border-gray-200 rounded-bl-lg rounded-br-lg border-t-transparent border-1": true,
          invisible: !isOpen,
          visible: isOpen
        })}
      >
        <ul>
          {memberships.map(membership => (
            <NavbarLeagueSelectorItem
              key={membership.id}
              leagueName={membership.leagueName}
              onClick={() => onSelectLeague(membership.leagueId)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavbarLeagueSelector;
