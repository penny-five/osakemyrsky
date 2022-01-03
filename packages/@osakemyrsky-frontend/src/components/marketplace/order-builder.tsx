import BuyStocksForm, { SubmitBuyOrderInput } from "./buy-stocks-form";
import SellStocksForm, { SubmitSellOrderInput } from "./sell-stocks-form";

import CountryFlag from "@/atoms/country-flag";
import Heading from "@/atoms/heading";
import StockPriceChart from "@/components/charts/stock-price-chart";
import Tab from "@/components/tab/tab";
import TabContainer from "@/components/tab/tab-container";
import { OrderType } from "@/types/order";
import { Stock } from "@/types/stock";
import { formatCents } from "@/utils/currency";

export interface OrderBuilderInput {
  symbol: string;
  priceCents: number;
  count: number;
  expirationDate: string;
  type: OrderType;
}

export interface OrderBuilderProps {
  stock: Stock;
  onSubmit: (order: OrderBuilderInput) => Promise<void>;
}

const OrderBuilder = ({ stock, onSubmit }: OrderBuilderProps) => {
  const onSubmitBuyOrder = async (order: SubmitBuyOrderInput) => {
    await onSubmit({
      symbol: stock.symbol,
      priceCents: order.price * 100,
      count: order.count,
      expirationDate: order.expirationDate,
      type: OrderType.BUY
    });
  };

  const onSubmitSellOrder = async (order: SubmitSellOrderInput) => {
    await onSubmit({
      symbol: stock.symbol,
      priceCents: order.price * 100,
      count: order.count,
      expirationDate: order.expirationDate,
      type: OrderType.SELL
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <CountryFlag countryCode={stock.exchangeCountry} />
        <Heading level={3} className="grow truncate">
          {stock.name}
        </Heading>
        <span className="text-xl font-bold whitespace-nowrap">{formatCents(stock.priceCents)}</span>
      </div>
      <span className="text-xs font-medium text-gray-500 truncate">{stock.symbol} / MARKET INFORMATION</span>
      <StockPriceChart />
      <TabContainer>
        <Tab title="Osta osakkeita">
          <BuyStocksForm stock={stock} onSubmit={onSubmitBuyOrder} />
        </Tab>
        <Tab title="Myy osakkeita">
          <SellStocksForm stock={stock} onSubmit={onSubmitSellOrder} />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default OrderBuilder;
