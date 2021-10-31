import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { FunctionComponent, useState } from "react";

import NavbarLeagueSelectorItem from "./navbar-league-selector-item";

import { League } from "src/types/league";

export interface NavbarLeagueSelectorProps {
  defaultLeague: League;
  leagues: League[];
  onSelect: (league: League) => void;
}

const NavbarLeagueSelector: FunctionComponent<NavbarLeagueSelectorProps> = ({ defaultLeague, leagues, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectLeague = (league: League) => {
    setIsOpen(false);
    onSelect(league);
  };

  return (
    <div
      className={classNames({
        "group flex flex-row items-center relative w-[220px] border-gray-200 border-1 py-2 px-3 rounded-lg": true,
        "hover:rounded-bl-none hover:rounded-br-none hover: hover:border-b-transparent": true
      })}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="flex-grow mx-3 truncate font-semibold select-none">{defaultLeague.name}</span>
      <ChevronDownIcon className="w-5  flex-shrink-0 text-gray-300" />
      <div
        className={classNames({
          "absolute top-full mt-[-1px] left-[-1px] right-[-1px] bg-white": true,
          "border-gray-200 rounded-bl-lg rounded-br-lg border-t-transparent border-1": true,
          invisible: !isOpen,
          visible: isOpen
        })}
      >
        <ul>
          {leagues.map(league => (
            <NavbarLeagueSelectorItem key={league.id} league={league} onClick={() => onSelectLeague(league)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavbarLeagueSelector;
