export interface NavbarUserDropdownItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const NavbarUserDropdownItem = ({ children, onClick }: NavbarUserDropdownItemProps) => {
  return (
    <li className="py-3 px-4 select-none cursor-pointer hover:bg-gray-100 last-of-type:rounded-b-3xl" onClick={onClick}>
      {children}
    </li>
  );
};

export default NavbarUserDropdownItem;
