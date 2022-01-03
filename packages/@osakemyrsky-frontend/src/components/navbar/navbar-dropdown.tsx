import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { ReactNode, useState } from "react";

export interface NavbarDropdownProps {
  isOpen?: boolean;
  content: ReactNode;
  dropdownContent: ReactNode;
}

const NavbarDropdown = ({ content, dropdownContent }: NavbarDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames(
        "group flex flex-row items-center relative w-[230px] h-[55px] border-gray-400 border-1 px-2 rounded-3xl",
        "hover:rounded-bl-none hover:rounded-br-none hover: hover:border-b-transparent"
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="grow truncate">{content}</div>
      <ChevronDownIcon className="w-5 shrink-0 text-gray-400 transition-transform group-hover:rotate-180" />
      <div
        className={classNames(
          "absolute top-full mt-[-1px] left-[-1px] right-[-1px] bg-white shadow-lg z-40",
          "border-gray-400 rounded-b-3xl border-t-transparent border-1",
          {
            invisible: !isOpen,
            visible: isOpen
          }
        )}
      >
        <div>{dropdownContent}</div>
      </div>
    </div>
  );
};

export default NavbarDropdown;
