import CountryFlag from "@/atoms/country-flag";
import { MemberStock } from "@/types/member-stock";
import { formatCents } from "@/utils/currency";

export interface StockItemProps {
  index: number;
  stock: MemberStock;
}

const StockItem = ({ index, stock }: StockItemProps) => {
  return (
    <li className="flex gap-4 w-full p-6 rounded-lg odd:bg-gray-200">
      <div className="flex-grow ">
        <div className="flex gap-2 items-center ">
          <CountryFlag countryCode={stock.exchangeCountry} size="sm" />
          <span className="text-lg font-bold truncate">
            {index + 1}. {stock.name}
          </span>
        </div>
        <div className="text-xs text-gray-500">{stock.symbol}</div>
      </div>
      <div className="flex flex-col text-lg font-bold flex-shrink-0">
        <div className="text-right">
          <span>{formatCents(stock.count * stock.priceCents)}</span>
        </div>
        <div className="text-xs font-medium text-right leading-snug">
          <span>{stock.count}</span>
          <span className="font-normal text-gray-500"> × </span>
          <span>{formatCents(stock.priceCents)}</span>
        </div>
      </div>
    </li>
  );
};

export default StockItem;
