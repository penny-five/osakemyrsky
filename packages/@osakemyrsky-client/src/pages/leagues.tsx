import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";

import LeagueListItem from "@/components/league-list-item";
import Button from "src/atoms/button";
import { League } from "src/types/league";

const GET_LEAGUES = gql`
  query GetLeagues {
    leagues {
      id
      name
      createdAt
      updatedAt
      startDate
      endDate
    }
  }
`;

const LeagueList: FunctionComponent = () => {
  const { data: session } = useSession();

  const { data, loading } = useQuery<{ leagues: League[] }>(GET_LEAGUES, {
    context: { session }
  });

  return (
    <div>
      <h2>Liigat</h2>
      <Link href="/create-league" passHref>
        <Button>Lisää uusi liiga</Button>
      </Link>
      {!loading && (
        <ul>
          {data?.leagues.map(league => (
            <LeagueListItem key={league.id} league={league} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeagueList;
