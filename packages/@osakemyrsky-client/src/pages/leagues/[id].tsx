import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { FunctionComponent } from "react";

import Button from "@/atoms/button";
import Panel from "@/atoms/panel";
import PageHeader from "@/components/page-header";
import { useUser } from "@/providers/user";
import { League } from "@/types/league";

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

  if (loading || data?.league == null) {
    return <></>;
  }

  return (
    <div className="flex-grow">
      <PageHeader
        title="Liigapörssi"
        leagueName={data.league.name}
        illustration={<Image src="/images/page-header-league.svg" alt="illustration" width="220px" height="220px" />}
      />
      {!isLeagueMember && <Button onClick={onRegisterMember}>Liity liigaan</Button>}
      <div className="flex flex-col gap-10 px-10 pb-8">
        <Panel title="Tilanne"></Panel>
        <Panel title="Jäsenet"></Panel>
        <Panel title="Viimeksi toteutuneet kaupat"></Panel>
      </div>
    </div>
  );
};

export default LeaguePage;
