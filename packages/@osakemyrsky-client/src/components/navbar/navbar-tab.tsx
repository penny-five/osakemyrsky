import { UrlObject } from "url";

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { urlMatches } from "@/utils/url";

export interface NavbarTabProps {
  children?: React.ReactNode;
  href: string | UrlObject;
}

const NavbarTab = ({ children, href }: NavbarTabProps) => {
  const router = useRouter();

  const isActive = urlMatches(router, href);

  return (
    <li className="px-2 pb-[6px]">
      <Link href={href} passHref>
        <a
          className={classNames(
            "relative py-2 text-sm font-semibold text-gray-500 after:absolute after:border-b-3",
            "transition-colors hover:text-black-100",
            { "!text-black-100 after:top-full after:left-0 after:right-0 after:border-blue-200": isActive }
          )}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default NavbarTab;
