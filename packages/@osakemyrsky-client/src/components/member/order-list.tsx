import OrderItem from "./order-item";

import Heading from "@/atoms/heading";
import { Order, OrderStatus } from "@/types/order";

export interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  const pendingOrders: Order[] = [];
  const completedOrders: Order[] = [];

  for (const order of orders) {
    if (order.status === OrderStatus.PENDING) {
      pendingOrders.push(order);
    } else {
      completedOrders.push(order);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <Heading level={4}>Aktiiviset</Heading>
      {pendingOrders.length > 0 ? (
        <ul className="flex flex-col w-full items-stretch mb-4">
          {pendingOrders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      ) : (
        <span className="py-4 px-6 text-base text-gray-500">Ei aktiivisia toimeksiantoja</span>
      )}
      <Heading level={4}>Sulkeutuneet</Heading>
      {completedOrders.length > 0 ? (
        <ul className="flex flex-col w-full items-stretch">
          {completedOrders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      ) : (
        <span className="py-4 px-6 text-base text-gray-500">Ei sulkeutuneita toimeksiantoja</span>
      )}
    </div>
  );
};

export default OrderList;
