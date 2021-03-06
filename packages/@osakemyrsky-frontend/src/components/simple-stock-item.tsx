import classNames from "classnames";

import CountryFlag from "@/atoms/country-flag";
import { Stock } from "@/types/stock";
import { formatCents } from "@/utils/currency";

export interface SimpleStockItemProps {
  stock: Stock;
  onClick?: () => void;
}

const SimpleStockItem = ({ stock, onClick }: SimpleStockItemProps) => {
  return (
    <li
      className="flex items-center py-4 px-4 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300"
      onClick={onClick}
    >
      <div className="flex flex-col grow min-w-0 gap-2">
        <div className="flex flex-row items-center gap-2">
          <CountryFlag size="sm" countryCode={stock.exchangeCountry} />
          <span className="text-lg font-semibold truncate">{stock.name}</span>
        </div>
        <span className="text-xs font-medium text-gray-500 truncate">{stock.symbol} / MARKET INFORMATION</span>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span
          className={classNames("font-semibold text-base", {
            "text-green-200": stock.priceDiffCents == null || stock.priceDiffCents >= 0,
            "text-red-200": stock.priceDiffCents != null && stock.priceDiffCents < 0
          })}
        >
          {stock.priceDiffPct} %
        </span>
        <span className="text-sm font-semibold">{formatCents(stock.priceCents)}</span>
      </div>
    </li>
  );
};

export default SimpleStockItem;
