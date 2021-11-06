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
import { League } from "@/types/league";

export interface NavbarProps {
  onSignOut: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ onSignOut }) => {
  const router = useRouter();

  const { user, status } = useUser();

  const { activeLeagueId, setActiveLeagueId } = useActiveLeague();

  let activeLeague: League | null = null;

  if (user != null && activeLeagueId != null) {
    activeLeague = user.memberships.find(membership => membership.id === activeLeagueId)?.league ?? null;

    if (activeLeague == null && user.memberships.length > 0) {
      activeLeague = user.memberships[0].league;
      setActiveLeagueId(activeLeague.id);
    }
  }

  const onSelectActiveLeague = (league: League) => {
    router.push({
      pathname: "/leagues/[id]",
      query: {
        id: league.id
      }
    });

    setActiveLeagueId(league.id);
  };

  return (
    <nav className="flex flex-col items-center w-full border-b-1 border-gray-200">
      <div className="flex flex-grow items-stretch gap-4 py-5 px-8 w-full max-w-screen-desktop">
        <Logo />
        <Link href="/" passHref>
          <a className="flex items-center">
            <Heading level={1}>Osakemyrsky</Heading>
          </a>
        </Link>
        <span className="flex-grow"></span>
        {user && activeLeague && (
          <NavbarLeagueSelector
            activeLeague={activeLeague}
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
          <NavbarNavigationLink target={`/leagues/${activeLeague.id}`}>Liigapörssi</NavbarNavigationLink>
          <NavbarNavigationLink target="/my-portfolio">Oma salkku</NavbarNavigationLink>
          <NavbarNavigationLink target="/marketplace">Osta/myy osakkeita</NavbarNavigationLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
