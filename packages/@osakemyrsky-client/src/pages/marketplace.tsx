import { gql, useApolloClient } from "@apollo/client";
import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";

import OrderBuilder, { OrderBuilderOrder } from "@/components/marketplace/order-builder";
import StockFinder from "@/components/marketplace/stock-finder";
import PageHeader from "@/components/page-header";
import { useActiveMembership } from "@/providers/active-membership";
import { Order, OrderType } from "@/types/order";
import { Stock } from "@/types/stock";

interface PlaceOrderInput {
  data: {
    type: OrderType;
    memberId: string;
    stockSymbol: string;
    stockCount: number;
    stockPriceCents: number;
    expirationDate: string;
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
          memberId: activeMembership!.id
        }
      },
      context: { session }
    });
  };

  return (
    <div className="grid grid-cols-[560px,1fr] grid-rows-[auto,1fr] flex-grow">
      <div className="col-span-2">
        <PageHeader title="Osta/myy osakkeita" />
      </div>
      <div className="col-span-1 bg-gray-100">
        <StockFinder onSelect={stock => setSelectedStock(stock)} />
      </div>
      <div className="col-span-1">
        {selectedStock && <OrderBuilder stock={selectedStock} onSubmit={onSubmitOrder} />}
      </div>
    </div>
  );
};

export default MyPortfolio;
