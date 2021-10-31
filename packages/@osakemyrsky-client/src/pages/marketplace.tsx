import { FunctionComponent } from "react";

import StockFinder from "@/components/marketplace/stock-finder";
import PageHeader from "@/components/page-header";
import { Stock } from "@/types/stock";

const MyPortfolio: FunctionComponent = () => {
  const onSelectStock = (stock: Stock) => {
    // eslint-disable-next-line no-console
    console.log(stock);
  };

  return (
    <div className="grid grid-cols-[560px,1fr] grid-rows-[auto,1fr] flex-grow">
      <div className="col-span-2">
        <PageHeader title="Osta/myy osakkeita" />
      </div>
      <div className="col-span-1 bg-gray-100">
        <StockFinder onSelect={onSelectStock} />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default MyPortfolio;
