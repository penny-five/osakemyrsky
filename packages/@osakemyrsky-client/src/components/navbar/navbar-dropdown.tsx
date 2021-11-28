import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { FunctionComponent, ReactNode, useState } from "react";

export interface NavbarDropdownProps {
  isOpen?: boolean;
  content: ReactNode;
  dropdownContent: ReactNode;
}

const NavbarDropdown: FunctionComponent<NavbarDropdownProps> = ({ content, dropdownContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames({
        "group flex flex-row items-center relative w-[230px] h-[55px] border-gray-200 border-1 px-2 rounded-3xl": true,
        "hover:rounded-bl-none hover:rounded-br-none hover: hover:border-b-transparent": true
      })}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex-grow truncate">{content}</div>
      <ChevronDownIcon className="w-5 flex-shrink-0 text-gray-300 transition-transform group-hover:rotate-180" />
      <div
        className={classNames({
          "absolute top-full mt-[-1px] left-[-1px] right-[-1px] bg-white shadow-lg": true,
          "border-gray-200 rounded-bl-3xl rounded-br-3xl border-t-transparent border-1": true,
          invisible: !isOpen,
          visible: isOpen
        })}
      >
        <div>{dropdownContent}</div>
      </div>
    </div>
  );
};

export default NavbarDropdown;
