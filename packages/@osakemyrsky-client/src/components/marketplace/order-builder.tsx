import { FunctionComponent } from "react";

import BuyStocksForm from "./buy-stocks-form";
import SellStocksForm from "./sell-stocks-form";

import CountryFlag from "@/atoms/country-flag";
import Heading from "@/atoms/heading";
import Tab from "@/components/tab/tab";
import TabContainer from "@/components/tab/tab-container";
import { OrderType } from "@/types/order";
import { Stock } from "@/types/stock";

export interface OrderBuilderOrder {
  type: OrderType;
  stockSymbol: string;
  stockPriceCents: number;
  stockCount: number;
  expirationDate: string;
}

export interface OrderBuilderProps {
  stock: Stock;
  onSubmit: (order: OrderBuilderOrder) => void;
}

const OrderBuilder: FunctionComponent<OrderBuilderProps> = ({ stock, onSubmit }) => {
  const onSubmitSellOrder = (order: { count: number; price: number }) => {
    // eslint-disable-next-line no-console
    console.log(order);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <CountryFlag countryCode={stock.exchangeCountry} />
        <Heading level={3} className="flex-grow truncate">
          {stock.name}
        </Heading>
        <span className="text-xl font-bold whitespace-nowrap">{stock.price} €</span>
      </div>
      <span className="text-xs font-medium text-gray-500 truncate">{stock.symbol} / MARKET INFORMATION</span>
      <div className="min-h-[400px] my-4 bg-gray-200 rounded-lg" />
      <TabContainer>
        <Tab title="Osta osakkeita">
          <BuyStocksForm
            stock={stock}
            onSubmit={order => onSubmit({ ...order, stockSymbol: stock.symbol, type: OrderType.BUY })}
          />
        </Tab>
        <Tab title="Myy osakkeita">
          <SellStocksForm stock={stock} onSubmit={onSubmitSellOrder} />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default OrderBuilder;
