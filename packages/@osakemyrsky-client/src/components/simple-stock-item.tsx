import classNames from "classnames";
import { FunctionComponent } from "react";

import CountryFlag from "@/atoms/country-flag";
import { Stock } from "@/types/stock";

export interface SimpleStockItemProps {
  stock: Stock;
  onClick?: () => void;
}

const SimpleStockItem: FunctionComponent<SimpleStockItemProps> = ({ stock, onClick }) => {
  return (
    <li className="flex items-center py-4 px-4 odd:bg-white cursor-pointer hover:bg-gray-200" onClick={onClick}>
      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex flex-row items-center gap-2">
          <CountryFlag size="sm" countryCode={stock.exchangeCountry} />
          <span className="text-base font-semibold truncate">{stock.name}</span>
        </div>
        <span className="text-xs font-medium text-gray-400 truncate">{stock.symbol} / MARKET INFORMATION</span>
      </div>
      <div className="flex flex-col items-end flex-shrink-0">
        <span
          className={classNames({
            "font-semibold text-base": true,
            "text-forest-300": stock.priceDiff == null || stock.priceDiff >= 0,
            "text-red-200": stock.priceDiff != null && stock.priceDiff < 0
          })}
        >
          {stock.priceDiffPct} %
        </span>
        <span className="text-sm font-semibold">{stock.price} €</span>
      </div>
    </li>
  );
};

SimpleStockItem.defaultProps = {
  onClick: () => {
    // noop
  }
};

export default SimpleStockItem;
