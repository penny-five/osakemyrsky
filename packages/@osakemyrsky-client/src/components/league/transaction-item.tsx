import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

import Avatar from "@/atoms/avatar";
import CountryFlag from "@/atoms/country-flag";
import { Transaction, TransactionType } from "@/types/transaction";
import { formatCurrency } from "@/utils/currency";
import { formatTimestamp } from "@/utils/dates/display";

export interface TransactionItemProps {
  transaction: Transaction;
  isUser: boolean;
}

const TransactionItem = ({ transaction, isUser }: TransactionItemProps) => {
  return (
    <li className="flex flex-col py-4 odd:bg-gray-200 rounded-xl">
      <time className="px-4 text-xs font-medium text-gray-500" dateTime={transaction.createdAt}>
        {formatTimestamp(transaction.createdAt)}
      </time>
      <div className="flex flex-row py-3 px-8 basis-0">
        <div className="flex flex-row items-center gap-4 grow basis-1 shrink-0">
          <Avatar url={transaction.member.picture} hightlight={isUser} />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-snug">{transaction.member.companyName}</span>
            <span className="text-sm font-medium text-gray-500 leading-snug">{transaction.member.name}</span>
          </div>
        </div>
        <div className="flex flex-row shrink-0">
          <div className="flex flex-col items-center gap-1">
            {transaction.type === TransactionType.BUY ? (
              <span className="text-green-200">
                {" "}
                <ArrowLeftIcon width={30} />
              </span>
            ) : (
              <span className="text-blue-200">
                <ArrowRightIcon width={30} />
              </span>
            )}
            <span className="text-xs font-bold uppercase text-center w-[50px]">
              {transaction.type === TransactionType.BUY ? "osto" : "myynti"}
            </span>
          </div>
          <div className="flex flex-col ml-6 min-w-[150px]">
            <span className="text-lg font-bold">
              {formatCurrency((transaction.unitPriceCents * transaction.count) / 100)}
            </span>
            <span className="text-xs my-[6px]">
              <span className="font-semibold">{transaction.count}</span>
              <span className="text-gray-500"> × </span>
              <span className="font-semibold">{formatCurrency(transaction.unitPriceCents / 100)}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col text-right grow basis-1 shrink truncate">
          <div className="flex flex-row items-center justify-end gap-2">
            <span className="text-lg font-bold leading-snug truncate">{transaction.stock.name}</span>
            <CountryFlag size="sm" countryCode={transaction.stock.exchangeCountry} />
          </div>
          <span className="text-sm font-medium text-gray-500 leading-snug">{transaction.stock.symbol}</span>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
