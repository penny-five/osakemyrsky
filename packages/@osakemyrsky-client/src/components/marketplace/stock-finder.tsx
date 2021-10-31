import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";

import SearchField from "../search-field";
import SimpleStockItem from "../simple-stock-item";

import Heading from "@/atoms/heading";
import { Stock } from "@/types/stock";

const SEARCH_STOCKS = gql`
  query SearchStocks($search: String!) {
    stocks(search: $search) {
      name
      symbol
      exchangeCountry
      price
      priceDiff
      priceDiffPct
      tradingStatus
    }
  }
`;

export interface StockFinderProps {
  onSelect: (stock: Stock) => void;
}

const StockFinder: FunctionComponent<StockFinderProps> = ({ onSelect }) => {
  const [searchphrase, setSearchphrase] = useState("");

  const { data: session } = useSession();

  const { data, loading } = useQuery<{ stocks: Stock[] }>(SEARCH_STOCKS, {
    variables: {
      search: searchphrase
    },
    context: { session },
    skip: searchphrase.length === 0
  });

  const onSearchChange = (value: string) => {
    setSearchphrase(value);
  };

  return (
    <div className="flex flex-col gap-4 py-6 px-8">
      <Heading level={3}>Hae osakkeita</Heading>
      <SearchField placeholder="Hae osakkeita tai instrumentteja" onSearch={onSearchChange} />
      {data?.stocks && data.stocks.length > 0 ? (
        <ul>
          {data?.stocks.map(stock => (
            <SimpleStockItem key={stock.symbol} stock={stock} onClick={() => onSelect(stock)} />
          ))}
        </ul>
      ) : loading ? (
        <span>Ladataan</span>
      ) : (
        <span>Ei tuloksia</span>
      )}
    </div>
  );
};

export default StockFinder;
