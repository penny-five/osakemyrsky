import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@/atoms/button";
import Panel from "@/atoms/panel";
import CreateLeagueModal, { SubmitCreateLeagueModalInputs } from "@/components/league-browser/create-league-modal";
import LeagueTable from "@/components/league-browser/league-table";
import PageHeader from "@/components/page-header";
import { useActiveLeague } from "@/providers/active-league";
import { useUser } from "@/providers/user";
import { League } from "@/types/league";

const GET_LEAGUES = gql`
  query GetLeagues {
    leagues {
      id
      name
      createdAt
      updatedAt
      startDate
      endDate
      status

      members {
        name
        picture
      }
    }
  }
`;

const CREATE_LEAGUE = gql`
  mutation CreateLeague($data: CreateLeagueInput!) {
    createLeague(createLeagueInput: $data) {
      id
      name
    }
  }
`;

interface CreateLeagueInput {
  data: {
    name: string;
    startDate: string;
    endDate: string;
  };
}

interface CreateLeagueResult {
  createLeague: League;
}

const LeagueBrowser = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { user } = useUser();
  const { data: session } = useSession();

  const { setActiveLeague } = useActiveLeague();

  const { data, loading } = useQuery<{ leagues: League[] }>(GET_LEAGUES, {
    context: { session }
  });

  const [isCreateLeagueModalOpen, setIsCreateLeagueModalOpen] = useState(false);

  if (data == null) {
    return <></>;
  }

  const numLeagues = data.leagues.length;
  const numMembers = data.leagues.flatMap(league => league.members!).length;

  const onCreateLeague = async (data: SubmitCreateLeagueModalInputs) => {
    const result = await client.mutate<CreateLeagueResult, CreateLeagueInput>({
      mutation: CREATE_LEAGUE,
      variables: { data },
      context: { session }
    });

    setActiveLeague(result.data!.createLeague.id);

    router.push({
      pathname: "/leagues/[id]",
      query: {
        id: result.data!.createLeague.id
      }
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <PageHeader
        title="Liigat"
        illustration={<Image src="/images/page-header-leagues.svg" alt="illustration" width="275px" height="275px" />}
        info={
          <dl className="flex gap-6">
            <div className="flex flex-col">
              <dt className="text-lg text-gray-500 font-semibold">Perustettuja liigoja</dt>
              <dd className="text-4xl font-extrabold">{numLeagues}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-lg text-gray-500 font-semibold">Jäseniä</dt>
              <dd className="text-4xl font-extrabold">{numMembers}</dd>
            </div>
          </dl>
        }
        actions={user != null && <Button onClick={() => setIsCreateLeagueModalOpen(true)}>Perusta uusi liiga</Button>}
      />
      {!loading && (
        <div className="px-10 pb-8">
          <Panel>
            <LeagueTable leagues={data.leagues} />
          </Panel>
        </div>
      )}
      {isCreateLeagueModalOpen && (
        <CreateLeagueModal onSubmit={onCreateLeague} onClose={() => setIsCreateLeagueModalOpen(false)} />
      )}
    </div>
  );
};

export default LeagueBrowser;
