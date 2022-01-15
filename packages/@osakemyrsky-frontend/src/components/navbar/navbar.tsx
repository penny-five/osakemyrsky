import { LoginIcon } from "@heroicons/react/solid";
import useScrollPosition from "@react-hook/window-scroll";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../../atoms/button";

import NavbarLeagueDropdown from "./navbar-league-dropdown";
import NavbarLeagueDropdownItem from "./navbar-league-dropdown-item";
import NavbarTab from "./navbar-tab";
import NavbarUserDropdown from "./navbar-user-dropdown";
import NavbarUserDropdownItem from "./navbar-user-dropdown-item";

import Logo from "@/atoms/logo";
import { useActiveLeague } from "@/providers/active-league";
import { useActiveMembership } from "@/providers/active-membership";
import { useUser } from "@/providers/user";

export type NavbarBehavior = "normal" | "sticky";

export interface NavbarProps {
  onSignIn: () => void;
  onSignOut: () => void;
  behavior?: NavbarBehavior;
}

const Navbar = ({ onSignIn, onSignOut, behavior = "sticky" }: NavbarProps) => {
  const router = useRouter();

  const scrollY = useScrollPosition();

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

  const showTranslucent = behavior === "sticky" && scrollY === 0;
  const showLeagueDropdown = user != null && activeMembership != null;
  const showTabs = user && activeMembership;

  return (
    <nav
      className={classNames("flex flex-col items-center w-full z-10 transition-colors", {
        relative: behavior === "normal",
        fixed: behavior === "sticky",
        "bg-white border-b-1 border-gray-400 shadow-lg": !showTranslucent
      })}
    >
      <div
        className={classNames("flex grow items-center gap-4 pt-4 pb-3 px-8 w-full max-w-screen-desktop", {
          "pb-4": !showTabs
        })}
      >
        <div className="flex flex-row gap-5">
          <Logo />
          <Link href="/" passHref>
            <a className="flex items-center">
              <h1
                className={classNames("text-4xl font-extrabold tracking-wide", {
                  "text-white": showTranslucent
                })}
              >
                Osakemyrsky
              </h1>
            </a>
          </Link>
        </div>
        <span className="grow"></span>
        {showLeagueDropdown && (
          <NavbarLeagueDropdown activeMembership={activeMembership}>
            {user.memberships.map(membership => (
              <NavbarLeagueDropdownItem
                key={membership.id}
                leagueName={membership.league.name}
                onClick={() => onSelectActiveLeague(membership.league.id)}
              />
            ))}
          </NavbarLeagueDropdown>
        )}
        {user && !activeMembership && (
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
          <Button priority="primary" icon={<LoginIcon style={{ transform: "rotate(180deg)" }} />} onClick={onSignIn}>
            Kirjaudu sisään
          </Button>
        ) : null}
      </div>
      {showTabs && (
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
