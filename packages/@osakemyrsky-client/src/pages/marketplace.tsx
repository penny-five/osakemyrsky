import { FunctionComponent, useState } from "react";

import OrderBuilder from "@/components/marketplace/order-builder";
import StockFinder from "@/components/marketplace/stock-finder";
import PageHeader from "@/components/page-header";
import { Stock } from "@/types/stock";

const MyPortfolio: FunctionComponent = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  return (
    <div className="grid grid-cols-[560px,1fr] grid-rows-[auto,1fr] flex-grow">
      <div className="col-span-2">
        <PageHeader title="Osta/myy osakkeita" />
      </div>
      <div className="col-span-1 bg-gray-100">
        <StockFinder onSelect={stock => setSelectedStock(stock)} />
      </div>
      <div className="col-span-1">{selectedStock && <OrderBuilder stock={selectedStock} />}</div>
    </div>
  );
};

export default MyPortfolio;
