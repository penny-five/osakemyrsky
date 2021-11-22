import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

export interface NavbarTabProps {
  target: string;
}

const NavbarTab: FunctionComponent<NavbarTabProps> = ({ children, target }) => {
  const router = useRouter();

  const isActive = router.asPath === target;

  return (
    <li className="px-2 pb-[6px]">
      <Link
        href={{
          pathname: target
        }}
        passHref
      >
        <a
          className={classNames({
            "relative py-2 text-sm font-bold text-gray-400 after:absolute after:border-b-2": true,
            "after:transition-colors": true,
            "!text-black-200 after:top-full after:left-0 after:right-0 after:border-black-200": isActive
          })}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default NavbarTab;
