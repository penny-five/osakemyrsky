import { FunctionComponent } from "react";

import { League } from "src/types/league";

export interface NavbarLeagueSelectorItemProps {
  league: League;
  onClick?: () => void;
}

const NavbarLeagueSelectorItem: FunctionComponent<NavbarLeagueSelectorItemProps> = ({ league, onClick }) => {
  return (
    <li
      className="py-3 px-4 truncate select-none cursor-pointer hover:bg-gray-100 last-of-type:rounded-b-lg"
      onClick={onClick}
    >
      {league.name}
    </li>
  );
};

NavbarLeagueSelectorItem.defaultProps = {
  onClick: () => {
    // noop
  }
};

export default NavbarLeagueSelectorItem;
