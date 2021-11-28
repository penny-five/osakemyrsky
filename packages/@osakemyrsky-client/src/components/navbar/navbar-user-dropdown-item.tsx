import classNames from "classnames";
import { FunctionComponent } from "react";

export interface NavbarUserDropdownItemProps {
  onClick?: () => void;
}

const NavbarUserDropdownItem: FunctionComponent<NavbarUserDropdownItemProps> = ({ children, onClick }) => {
  return (
    <li
      className={classNames({
        "py-3 px-4 select-none cursor-pointer hover:bg-gray-100 last-of-type:rounded-b-3xl": true
      })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

NavbarUserDropdownItem.defaultProps = {
  onClick: () => {
    // noop
  }
};

export default NavbarUserDropdownItem;
