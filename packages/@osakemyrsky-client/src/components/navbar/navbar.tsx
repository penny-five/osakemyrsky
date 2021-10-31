import { ArchiveIcon } from "@heroicons/react/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import Button, { ButtonPriority } from "../../atoms/button";
import Heading from "../../atoms/heading";

import NavbarLeagueSelector from "./navbar-league-selector";
import NavbarNavigationLink from "./navbar-navigation-link";
import NavbarUserDropdown from "./navbar-user-dropdown";
import NavbarUserDropdownItem from "./navbar-user-dropdown-item";

import { useDefaultLeague } from "src/providers/default-league";
import { useUser } from "src/providers/user";
import { League } from "src/types/league";

export interface NavbarProps {
  onSignOut: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ onSignOut }) => {
  const router = useRouter();

  const { user, status } = useUser();

  const { defaultLeagueId, setDefaultLeagueId } = useDefaultLeague();

  let defaultLeague: League | null = null;

  if (user != null && defaultLeagueId != null) {
    defaultLeague = user.leagues.find(league => league.id === defaultLeagueId) ?? null;

    if (defaultLeague == null && user.leagues.length > 0) {
      defaultLeague = user.leagues[0];
      setDefaultLeagueId(defaultLeague.id);
    }
  }

  const onSelectDefaultLeague = (league: League) => {
    router.push({
      pathname: "/leagues/[id]",
      query: {
        id: league.id
      }
    });

    setDefaultLeagueId(league.id);
  };

  return (
    <nav className="flex flex-col items-center w-full border-b-1 border-gray-100">
      <div className="flex flex-grow items-stretch gap-4 py-5 px-8 w-full max-w-7xl">
        <span className="w-14 h-14 bg-gray-200 rounded-full" />
        <Link href="/" passHref>
          <a className="flex items-center">
            <Heading level={1}>Osakemyrsky</Heading>
          </a>
        </Link>
        <span className="flex-grow"></span>
        {user && defaultLeague && (
          <NavbarLeagueSelector
            defaultLeague={user.leagues.find(league => league.id === defaultLeagueId)!}
            leagues={user.leagues}
            onSelect={onSelectDefaultLeague}
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
      {defaultLeague && (
        <ul className="flex flex-row flex-grow items-center px-8 w-full max-w-7xl">
          <NavbarNavigationLink target={`/leagues/${defaultLeague.id}`}>Liigapörssi</NavbarNavigationLink>
          <NavbarNavigationLink target="/my-portfolio">Oma salkku</NavbarNavigationLink>
          <NavbarNavigationLink target="/marketplace">Osta/myy osakkeita</NavbarNavigationLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
