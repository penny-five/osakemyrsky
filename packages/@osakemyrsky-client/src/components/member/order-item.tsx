import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

import CountryFlag from "@/atoms/country-flag";
import { Order, OrderStatus, OrderType } from "@/types/order";
import { formatCents } from "@/utils/currency";
import { formatDay, formatTimestamp } from "@/utils/dates/display";

export interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <li className="flex flex-col p-2 odd:bg-gray-200 rounded-xl">
      <div className="flex flex-row py-4 px-4 basis-0">
        <div className="flex flex-col grow basis-1 shrink-0">
          <span className="text-lg font-bold">{formatCents(order.stockPriceCents * order.stockCount)}</span>
          <span className="text-xs font-medium leading-snug">
            <span>{order.stockCount}</span>
            <span className="font-normal text-gray-500"> × </span>
            <span>{formatCents(order.stockPriceCents)}</span>
          </span>
        </div>
        <div className="shrink-0 flex flex-col items-center justify-center gap-1">
          {order.type === OrderType.BUY ? (
            <ArrowLeftIcon width={30} className="text-green-200" />
          ) : (
            <ArrowRightIcon width={30} className="text-blue-200" />
          )}
          <span className="text-xs font-bold uppercase text-center w-[50px]">
            {order.type === OrderType.BUY ? "osto" : "myynti"}
          </span>
        </div>
        <div className="flex flex-col text-right grow basis-1 shrink truncate">
          <div className="flex flex-row items-center justify-end gap-2">
            <span className="text-lg font-bold leading-snug truncate">{order.stock.name}</span>
            <CountryFlag size="sm" countryCode={order.stock.exchangeCountry} />
          </div>
          <span className="text-sm font-medium text-gray-500 leading-snug">{order.stock.symbol}</span>
        </div>
      </div>
      <div className="flex flex-row py-3 px-4 basis-0">
        <div className="grow basis-1 shrink-0 text-xs font-medium text-gray-500">
          <span>Lisätty </span>
          <time dateTime={order.createdAt}>{formatTimestamp(order.createdAt)}</time>
        </div>
        {order.status === OrderStatus.PENDING ? (
          <div className="shrink-0 text-xs font-medium text-black-100">
            <span>Voimassa </span>
            <time dateTime={order.createdAt} className="font-bold">
              {formatDay(order.expirationDate)}
            </time>
            <span> asti</span>
          </div>
        ) : (
          <div className="shrink-0 text-xs font-medium text-black-100">
            <span>Sulkeutunut </span>
            <time dateTime={order.createdAt} className="font-bold">
              {formatDay(order.expirationDate)}
            </time>
          </div>
        )}
        <div className="grow basis-1 shrink text-xs text-right">
          {order.status === OrderStatus.PENDING && <span className="text-black-100">Odottaa</span>}
          {order.status === OrderStatus.COMPLETED && <span className="text-green-200">Toteutunut</span>}
          {order.status === OrderStatus.EXPIRED && <span className="text-gray-500">Vanhentunut</span>}
          {order.status === OrderStatus.FAILED && <span className="text-red-200">Epäonnistunut</span>}
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
