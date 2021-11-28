import { ArchiveIcon } from "@heroicons/react/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import Button, { ButtonPriority } from "../../atoms/button";
import Heading from "../../atoms/heading";

import NavbarLeagueSelector from "./navbar-league-selector";
import NavbarNavigationLink from "./navbar-tab";
import NavbarUserDropdown from "./navbar-user-dropdown";
import NavbarUserDropdownItem from "./navbar-user-dropdown-item";

import Logo from "@/atoms/logo";
import { useActiveLeague } from "@/providers/active-league";
import { useUser } from "@/providers/user";
import { Membership } from "@/types/membership";

export interface NavbarProps {
  onSignOut: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ onSignOut }) => {
  const router = useRouter();

  const { user, status } = useUser();

  const { activeLeague, setActiveLeague } = useActiveLeague();

  let activeMembership: Membership | null = null;

  if (user != null) {
    if (activeLeague == null && user.memberships.length > 0) {
      setActiveLeague(user.memberships[0].leagueId);
    }

    if (activeLeague != null) {
      activeMembership = user.memberships.find(membership => membership.leagueId === activeLeague) ?? null;

      if (activeMembership == null && user.memberships.length > 0) {
        activeMembership = user.memberships[0];
        setActiveLeague(activeMembership.leagueId);
      }
    }
  }

  const onSelectActiveLeague = (leagueId: string) => {
    router.push({
      pathname: "/leagues/[id]",
      query: {
        id: leagueId
      }
    });

    setActiveLeague(leagueId);
  };

  return (
    <nav className="flex flex-col items-center w-full border-b-1 border-gray-200 shadow-lg">
      <div className="flex flex-grow items-end gap-4 pt-6 pb-4 px-8 w-full max-w-screen-desktop">
        <div className="flex flex-row gap-3">
          <Logo />
          <Link href="/" passHref>
            <a className="flex items-center">
              <Heading level={1}>Osakemyrsky</Heading>
            </a>
          </Link>
        </div>
        <span className="flex-grow"></span>
        {user && activeMembership && (
          <NavbarLeagueSelector
            activeMembership={activeMembership}
            memberships={user.memberships}
            onSelect={onSelectActiveLeague}
          />
        )}
        {user ? (
          <div>
            <NavbarUserDropdown user={user}>
              <NavbarUserDropdownItem onClick={onSignOut}>Kirjaudu ulos</NavbarUserDropdownItem>
            </NavbarUserDropdown>
          </div>
        ) : status === "unauthenticated" ? (
          <Button priority={ButtonPriority.PRIMARY} icon={<ArchiveIcon />} onClick={() => signIn("google")}>
            Kirjaudu sisään
          </Button>
        ) : null}
      </div>
      {activeLeague && (
        <ul className="flex flex-row flex-grow items-center px-8 w-full max-w-screen-desktop">
          <NavbarNavigationLink target={`/leagues/${activeLeague}`}>Liigapörssi</NavbarNavigationLink>
          <NavbarNavigationLink target="/my-portfolio">Oma salkku</NavbarNavigationLink>
          <NavbarNavigationLink target="/marketplace">Osta/myy osakkeita</NavbarNavigationLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
