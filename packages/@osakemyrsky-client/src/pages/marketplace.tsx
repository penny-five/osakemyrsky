import { gql, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import Panel from "@/atoms/panel";
import OrderBuilder, { OrderBuilderInput } from "@/components/marketplace/order-builder";
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

const MyPortfolio = () => {
  const client = useApolloClient();

  const { activeMembership } = useActiveMembership();

  const { data: session } = useSession();

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const onSubmitOrder = async (order: OrderBuilderInput) => {
    await client.mutate<PlaceOrderResult, PlaceOrderInput>({
      mutation: PLACE_ORDER,
      variables: {
        data: {
          leagueId: activeMembership!.leagueId,
          stockCount: order.count,
          stockSymbol: order.symbol,
          stockPriceCents: order.price,
          expirationDate: order.expirationDate,
          type: order.type
        }
      },
      context: { session }
    });
  };

  return (
    <div className="flex flex-col grow">
      <PageHeader
        title="Osta/myy osakkeita"
        subtitle={activeMembership?.leagueName ?? ""}
        illustration={
          <Image src="/images/page-header-marketplace.svg" alt="illustration" width="275px" height="275px" />
        }
      />
      <div className="px-10 pb-8">
        <Panel title="Hae osakkeita">
          <div className="grid grid-cols-[400px,1px,1fr] gap-8 min-h-[800px]">
            <div>
              <StockFinder onSelect={stock => setSelectedStock(stock)} />
            </div>
            <div className="border-r-1 border-gray-300"></div>
            <div>
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
