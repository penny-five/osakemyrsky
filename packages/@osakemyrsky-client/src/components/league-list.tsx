import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { FunctionComponent } from "react";

import LeagueListItem from "./leagues/league-list-item";

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
