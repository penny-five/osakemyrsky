import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";

import Panel from "@/atoms/panel";
import OrderList from "@/components/member/order-list";
import StockList from "@/components/member/stock-list";
import PageHeader from "@/components/page-header";
import { useSession } from "@/providers/session";
import { useUser } from "@/providers/user";
import { Member } from "@/types/member";
import { formatCents } from "@/utils/currency";

const GET_MEMBER = gql`
  query GetMember($leagueId: String!, $memberId: String!) {
    member(leagueId: $leagueId, memberId: $memberId) {
      id
      createdAt
      updatedAt

      league {
        id
        name
      }

      user {
        id
        name
        picture
      }

      balanceUpdatedAt
      balanceCents

      stocks {
        symbol
        name
        exchangeCountry
        priceCents
        count
      }

      orders {
        id
        createdAt
        updatedAt

        stock {
          symbol
          name
          exchangeCountry
        }

        member {
          picture
        }

        stockPriceCents
        stockPriceString
        stockCount
        expirationDate
        type
        status
      }
    }
  }
`;

const LeagueMember = () => {
  const router = useRouter();

  const session = useSession();

  const { user } = useUser();

  const { data, loading } = useQuery<{ member: Member }>(GET_MEMBER, {
    variables: {
      leagueId: router.query.id as string,
      memberId: router.query.memberId as string
    },
    context: { session },
    skip: session == null
  });

  if (loading || data?.member == null) {
    return <></>;
  }

  const isUser = data.member.user.id === user?.id;

  return (
    <div className="grow">
      <PageHeader
        title={isUser ? "Oma salkku" : data.member.companyName}
        subtitle={data.member.league.name}
        illustration={
          <Image src="/images/page-header-my-portfolio.svg" alt="illustration" width="225px" height="225px" />
        }
        info={
          <dl className="flex gap-6">
            <div className="flex flex-col">
              <dt className="text-base text-gray-500 font-semibold">Sijoitus liigassa</dt>
              <dd className="text-3xl font-extrabold">?</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base text-gray-500 font-semibold">Salkun arvo</dt>
              <dd className="text-3xl font-extrabold">{formatCents(data.member.balanceCents)}</dd>
            </div>
          </dl>
        }
      />
      <div className="flex flex-col gap-10 px-10 pb-8">
        <Panel title="Salkun kehitys"></Panel>
        <Panel title="Omistukset">
          <StockList stocks={data.member.stocks} />
        </Panel>
        <Panel title="Toimeksiannot">
          <OrderList orders={data.member.orders} />
        </Panel>
      </div>
    </div>
  );
};

export default LeagueMember;
