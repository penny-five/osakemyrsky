import StockItem from "./stock-item";

import PanelColumn from "@/atoms/panel-column";
import { MemberStock } from "@/types/member-stock";

export interface StockListProps {
  stocks: MemberStock[];
}

const StockList = ({ stocks }: StockListProps) => {
  return (
    <>
      <PanelColumn>
        <ul className="flex flex-col w-full">
          {stocks.slice(0, Math.ceil(stocks.length / 2)).map((stock, index) => (
            <StockItem key={stock.symbol} index={index} stock={stock} />
          ))}
        </ul>
      </PanelColumn>
      <PanelColumn>
        <ul className="flex flex-col w-full">
          {stocks.slice(Math.ceil(stocks.length / 2)).map((stock, index) => (
            <StockItem key={stock.symbol} index={index + Math.floor(stocks.length / 2)} stock={stock} />
          ))}
        </ul>
      </PanelColumn>
    </>
  );
};

export default StockList;
