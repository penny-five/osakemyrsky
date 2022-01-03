import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

import Button from "@/atoms/button";
import Panel from "@/atoms/panel";
import PanelColumn from "@/atoms/panel-column";
import LeagueStatusBadge from "@/components/league-status-badge";
import MemberList from "@/components/league/member-list";
import TransactionList from "@/components/league/transaction-list";
import PageHeader from "@/components/page-header";
import { useSession } from "@/providers/session";
import { useUser } from "@/providers/user";
import { League } from "@/types/league";
import { formatDayRange } from "@/utils/dates/display";

const GET_LEAGUE = gql`
  query GetLeague($id: String!) {
    league(id: $id) {
      id
      name
      createdAt
      updatedAt
      startDate
      endDate
      status

      members {
        id
        user {
          id
          name
          picture
        }
        league {
          id
        }
        companyName
        balanceCents
        balanceUpdatedAt
      }

      transactions {
        id
        createdAt
        member {
          id
          userId
          name
          picture
          companyName
        }
        stock {
          name
          symbol
          exchangeCountry
        }
        count
        unitPriceCents
        type
      }
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

const LeaguePage = () => {
  const client = useApolloClient();

  const router = useRouter();

  const leagueId = router.query.id as string;

  const { user } = useUser();

  const session = useSession();

  const { data, loading } = useQuery<{ league: League }>(GET_LEAGUE, {
    variables: {
      id: leagueId
    },
    context: { session },
    skip: session == null
  });

  const isLeagueMember = user?.memberships.some(membership => membership.league.id === leagueId);

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
    <div className="grow">
      <PageHeader
        title="Liigapörssi"
        subtitle={data.league.name}
        illustration={<Image src="/images/page-header-league.svg" alt="illustration" width="250px" height="250px" />}
        actions={!isLeagueMember && <Button onClick={onRegisterMember}>Liity liigaan</Button>}
        info={
          <div className="flex gap-4 items-center">
            <span className=" font-semibold text-base">
              {formatDayRange(data.league.startDate, data.league.endDate)}
            </span>

            <LeagueStatusBadge status={data.league.status} />
          </div>
        }
      />
      <div className="flex flex-col gap-10 px-10 pb-8">
        <Panel title="Tilanne" />
        <Panel>
          <PanelColumn title="Jäsenet">
            <MemberList leagueId={leagueId} members={data.league.members} />
          </PanelColumn>
          <PanelColumn title="Suosituimmat osakkeet"></PanelColumn>
        </Panel>
        <Panel title="Viimeksi toteutuneet kaupat">
          <TransactionList transactions={data.league.transactions} />
        </Panel>
      </div>
    </div>
  );
};

export default LeaguePage;
