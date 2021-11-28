import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";

import Button from "src/atoms/button";
import { useUser } from "src/providers/user";
import { League } from "src/types/league";

const GET_LEAGUE = gql`
  query GetLeague($id: String!) {
    league(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

interface JoinLeagueInput {
  data: {
    leagueId: string;
    companyName: string;
  };
}

const JOIN_LEAGUE = gql`
  mutation JoinLeague($data: JoinLeagueInput!) {
    joinLeague(joinLeagueInput: $data) {
      id
    }
  }
`;

const LeaguePage: FunctionComponent = () => {
  const client = useApolloClient();

  const router = useRouter();

  const { user } = useUser();

  const leagueId = router.query.id as string;

  const { data: session, status } = useSession();

  const { data, loading } = useQuery<{ league: League }>(GET_LEAGUE, {
    variables: {
      id: router.query.id
    },
    context: { session },
    skip: status !== "authenticated"
  });

  const isLeagueMember = user?.memberships.some(membership => membership.leagueId === leagueId);

  const onRegisterMember = async () => {
    await client.mutate<void, JoinLeagueInput>({
      mutation: JOIN_LEAGUE,
      variables: { data: { leagueId, companyName: "Omnicorp" } },
      context: { session }
    });
  };

  return (
    <div>
      {!loading && (
        <dl>
          <dt className="font-bold text-sm">ID</dt>
          <dd>{data?.league.id}</dd>
          <dt className="font-bold text-sm mt-4">Nimi</dt>
          <dd>{data?.league.name}</dd>
          {!isLeagueMember && <Button onClick={onRegisterMember}>Liity liigaan</Button>}
        </dl>
      )}
    </div>
  );
};

export default LeaguePage;
