import { gql, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FunctionComponent, useState } from "react";

import Panel from "@/atoms/panel";
import OrderBuilder, { OrderBuilderOrder } from "@/components/marketplace/order-builder";
import StockFinder from "@/components/marketplace/stock-finder";
import PageHeader from "@/components/page-header";
import { useActiveMembership } from "@/providers/active-membership";
import { Order, OrderType } from "@/types/order";
import { Stock } from "@/types/stock";

interface PlaceOrderInput {
  data: {
    leagueId: string;
    stockSymbol: string;
    stockCount: number;
    stockPriceCents: number;
    expirationDate: string;
    type: OrderType;
  };
}

interface PlaceOrderResult {
  PlaceOrder: Order;
}

const PLACE_ORDER = gql`
  mutation PlaceOrder($data: PlaceOrderInput!) {
    placeOrder(placeOrderInput: $data) {
      id
    }
  }
`;

const MyPortfolio: FunctionComponent = () => {
  const client = useApolloClient();

  const { activeMembership } = useActiveMembership();

  const { data: session } = useSession();

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const onSubmitOrder = async (order: OrderBuilderOrder) => {
    await client.mutate<PlaceOrderResult, PlaceOrderInput>({
      mutation: PLACE_ORDER,
      variables: {
        data: {
          ...order,
          leagueId: activeMembership!.leagueId
        }
      },
      context: { session }
    });
  };

  return (
    <div className="flex-grow">
      <PageHeader
        title="Osta/myy osakkeita"
        leagueName={activeMembership?.leagueName ?? ""}
        illustration={
          <Image src="/images/page-header-marketplace.svg" alt="illustration" width="250px" height="250px" />
        }
      />
      <div className="px-10 pb-8">
        <Panel title="Hae osakkeita">
          <div className="flex gap-8 min-h-[800px]">
            <div className="w-[35%]">
              <StockFinder onSelect={stock => setSelectedStock(stock)} />
            </div>
            <div className="border-r-1 border-gray-300"></div>
            <div className="w-[65%]">
              {selectedStock ? (
                <OrderBuilder stock={selectedStock} onSubmit={onSubmitOrder} />
              ) : (
                <p className="text-center text-lg font-bold">Valitse ensin osake</p>
              )}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default MyPortfolio;
