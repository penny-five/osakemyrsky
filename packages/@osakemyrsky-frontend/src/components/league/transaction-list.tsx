import TransactionItem from "./transaction-item";

import { useUser } from "@/providers/user";
import { Transaction } from "@/types/transaction";

export interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const { user } = useUser();

  return (
    <ul className="flex flex-col w-full items-stretch">
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          isUser={user?.id === transaction.member.userId}
        />
      ))}
    </ul>
  );
};

export default TransactionList;
