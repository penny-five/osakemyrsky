import Link from "next/link";
import { FunctionComponent } from "react";

import { League } from "src/types/league";

export interface LeagueListItemProps {
  league: League;
}

const LeagueListItem: FunctionComponent<LeagueListItemProps> = props => {
  return (
    <Link
      href={{
        pathname: "/leagues/[id]",
        query: { id: props.league.id }
      }}
      passHref
    >
      <li key={props.league.id} className="my-8 py-4 px-4 bg-gray-300">
        {props.league.name}
      </li>
    </Link>
  );
};

export default LeagueListItem;
