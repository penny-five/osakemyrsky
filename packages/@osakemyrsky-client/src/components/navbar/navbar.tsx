import { ArchiveIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../../atoms/button";
import Heading from "../../atoms/heading";

import NavbarLeagueDropdown from "./navbar-league-dropdown";
import NavbarLeagueDropdownItem from "./navbar-league-dropdown-item";
import NavbarTab from "./navbar-tab";
import NavbarUserDropdown from "./navbar-user-dropdown";
import NavbarUserDropdownItem from "./navbar-user-dropdown-item";

import Logo from "@/atoms/logo";
import { useActiveLeague } from "@/providers/active-league";
import { useActiveMembership } from "@/providers/active-membership";
import { useUser } from "@/providers/user";

export interface NavbarProps {
  onSignIn: () => void;
  onSignOut: () => void;
}

const Navbar = ({ onSignIn, onSignOut }: NavbarProps) => {
  const router = useRouter();

  const { user, status } = useUser();

  const { setActiveLeague } = useActiveLeague();

  const { activeMembership } = useActiveMembership();

  const onSelectActiveLeague = (leagueId: string) => {
    void router.push({
      pathname: "/leagues/[id]",
      query: {
        id: leagueId
      }
    });

    setActiveLeague(leagueId);
  };

  return (
    <nav className="flex flex-col items-center w-full bg-white border-b-1 border-gray-400 shadow-lg z-10">
      <div className="flex grow items-end gap-4 pt-6 pb-4 px-8 w-full max-w-screen-desktop">
        <div className="flex flex-row gap-3">
          <Logo />
          <Link href="/" passHref>
            <a className="flex items-center">
              <Heading level={1}>Osakemyrsky</Heading>
            </a>
          </Link>
        </div>
        <span className="grow"></span>
        {user && activeMembership ? (
          <NavbarLeagueDropdown activeMembership={activeMembership}>
            {user.memberships.map(membership => (
              <NavbarLeagueDropdownItem
                key={membership.id}
                leagueName={membership.league.name}
                onClick={() => onSelectActiveLeague(membership.league.id)}
              />
            ))}
          </NavbarLeagueDropdown>
        ) : (
          <Link href="/leagues" passHref>
            <a>
              <Button variant="text" priority="primary">
                Selaa liigoja
              </Button>
            </a>
          </Link>
        )}
        {user ? (
          <div>
            <NavbarUserDropdown user={user}>
              <NavbarUserDropdownItem onClick={onSignOut}>Kirjaudu ulos</NavbarUserDropdownItem>
            </NavbarUserDropdown>
          </div>
        ) : status === "unauthenticated" ? (
          <Button priority="primary" icon={<ArchiveIcon />} onClick={onSignIn}>
            Kirjaudu sisään
          </Button>
        ) : null}
      </div>
      {user && activeMembership && (
        <ul className="flex flex-row grow items-center px-8 w-full max-w-screen-desktop">
          <NavbarTab href={`/leagues/${activeMembership.league.id}`}>Liigapörssi</NavbarTab>
          <NavbarTab
            href={{
              pathname: "/leagues/[id]/members/[memberId]",
              query: { id: activeMembership.league.id, memberId: activeMembership.member.id }
            }}
          >
            Oma salkku
          </NavbarTab>
          <NavbarTab href="/marketplace">Osta/myy osakkeita</NavbarTab>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
