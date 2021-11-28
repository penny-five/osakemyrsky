import { useApolloClient, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import Heading from "@/atoms/heading";
import CreateLeagueForm, { CreateLeagueFormData } from "@/components/create-league-form";
import LeagueList from "@/components/league-list";
import { useActiveLeague } from "@/providers/active-league";
import { League } from "@/types/league";

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

const CREATE_LEAGUE = gql`
  mutation CreateLeague($data: CreateLeagueInput!) {
    createLeague(createLeagueInput: $data) {
      id
      name
    }
  }
`;

const Home: FunctionComponent = () => {
  const router = useRouter();
  const client = useApolloClient();

  const { data: session, status } = useSession();

  const { setActiveLeague } = useActiveLeague();

  const onCreateLeague = async (data: CreateLeagueFormData) => {
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
    <div>
      <Heading level={2}>Lisää uusi liiga</Heading>
      <main>
        {status === "authenticated" && session ? <CreateLeagueForm onSubmit={onCreateLeague} /> : null}
        <LeagueList />
      </main>
    </div>
  );
};

export default Home;
