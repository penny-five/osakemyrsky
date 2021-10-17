import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";

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

const LeaguePage: FunctionComponent = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const { data, loading } = useQuery<{ league: League }>(GET_LEAGUE, {
    variables: {
      id: router.query.id
    },
    context: { session },
    skip: status !== "authenticated"
  });

  return (
    <div>
      {!loading && (
        <dl>
          <dt className="font-bold text-sm">id</dt>
          <dd>{data?.league.id}</dd>
          <dt className="font-bold text-sm mt-4">name</dt>
          <dd>{data?.league.name}</dd>
        </dl>
      )}
    </div>
  );
};

export default LeaguePage;
