export interface NavbarLeagueDropdownItemProps {
  leagueName: string;
  onClick?: () => void;
}

const NavbarLeagueDropdownItem = ({ leagueName, onClick }: NavbarLeagueDropdownItemProps) => {
  return (
    <li className="py-3 px-4 truncate select-none cursor-pointer hover:bg-gray-200" onClick={onClick}>
      {leagueName}
    </li>
  );
};

export default NavbarLeagueDropdownItem;
