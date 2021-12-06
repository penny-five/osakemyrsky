import { FunctionComponent } from "react";

export interface NavbarLeagueDropdownItemProps {
  leagueName: string;
  onClick?: () => void;
}

const NavbarLeagueDropdownItem: FunctionComponent<NavbarLeagueDropdownItemProps> = ({ leagueName, onClick }) => {
  return (
    <li className="py-3 px-4 truncate select-none cursor-pointer hover:bg-gray-200" onClick={onClick}>
      {leagueName}
    </li>
  );
};

NavbarLeagueDropdownItem.defaultProps = {
  onClick: () => {
    // noop
  }
};

export default NavbarLeagueDropdownItem;
