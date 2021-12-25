import { CheckCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

import Button from "@/atoms/button";
import { useActiveMembership } from "@/providers/active-membership";
import { formatCents } from "@/utils/currency";
import { formatDay } from "@/utils/dates/display";

export interface OrderSubmittedMessageProps {
  message: string;
  count: number;
  priceCents: number;
  expirationDate: string;
}

const OrderSubmittedMessage = (props: OrderSubmittedMessageProps) => {
  const { activeMembership } = useActiveMembership();

  return (
    <div className="flex flex-col gap-4 bg-gray-200 py-4 px-4 rounded-lg">
      <div className="flex gap-6">
        <div className="shrink-0 p-4 pb-0">
          <Image src="/images/illustration-order-submitted.svg" alt="illustration" width="200px" height="200px" />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <p className="flex items-center gap-2">
            <CheckCircleIcon width={30} className="text-green-200" />
            <span className="font-bold text-lg">{props.message}</span>
          </p>
          <span className="font-bold text-2xl">
            {props.count} × {formatCents(props.priceCents)}
          </span>
          <span className="text-sm text-gray-600">
            Voimassa <strong>{formatDay(props.expirationDate)}</strong> asti.
          </span>
        </div>
      </div>
      {activeMembership != null && (
        <div className="self-end">
          <Link
            href={{
              pathname: "/leagues/[id]/members/[memberId]",
              query: { id: activeMembership.league.id, memberId: activeMembership.member.id }
            }}
            passHref
          >
            <Button priority="secondary">Selaa omia toimeksiantoja</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSubmittedMessage;
