import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

export interface NavbarNavigationLinkProps {
  target: string;
}

const NavbarNavigationLink: FunctionComponent<NavbarNavigationLinkProps> = ({ children, target }) => {
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
            "relative py-2 text-sm font-semibold text-black-200 after:absolute after:border-b-2": true,
            "!text-bronze-200 after:top-full after:left-0 after:right-0 after:border-bronze-200": isActive
          })}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default NavbarNavigationLink;
