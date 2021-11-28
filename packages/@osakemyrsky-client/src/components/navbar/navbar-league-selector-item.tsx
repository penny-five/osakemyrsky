import { FunctionComponent } from "react";

export interface NavbarLeagueSelectorItemProps {
  leagueName: string;
  onClick?: () => void;
}

const NavbarLeagueSelectorItem: FunctionComponent<NavbarLeagueSelectorItemProps> = ({ leagueName, onClick }) => {
  return (
    <li
      className="py-3 px-4 truncate select-none cursor-pointer hover:bg-gray-100 last-of-type:rounded-b-lg"
      onClick={onClick}
    >
      {leagueName}
    </li>
  );
};

NavbarLeagueSelectorItem.defaultProps = {
  onClick: () => {
    // noop
  }
};

export default NavbarLeagueSelectorItem;
