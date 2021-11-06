import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { FunctionComponent } from "react";

import { User } from "src/types/user";

const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

const Profile: FunctionComponent = () => {
  const { data: session, status } = useSession();

  const { data, loading } = useQuery<{ me: User }>(GET_ME, {
    context: { session },
    skip: status !== "authenticated"
  });

  return (
    <div>
      {!loading && (
        <dl>
          <dt className="font-bold text-sm">user id</dt>
          <dd>{data?.me?.id}</dd>
          <dt className="font-bold text-sm mt-4">email</dt>
          <dd>{data?.me?.name}</dd>
        </dl>
      )}
    </div>
  );
};

export default Profile;
