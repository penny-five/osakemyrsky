import Avatar from "@/atoms/avatar";
import TrendIcon from "@/atoms/trend-icon";
import { Member } from "@/types/member";
import { formatCents } from "@/utils/currency";

export interface SimpleStockItemProps {
  member: Member;
  isUser: boolean;
}

const MemberItem = ({ member, isUser }: SimpleStockItemProps) => {
  return (
    <li className="flex items-center py-4 px-5 gap-4 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300">
      <Avatar url={member.picture} hightlight={isUser} />
      <div className="grow flex flex-col truncate">
        <span className="font-bold text-lg leading-snug truncate">{member.companyName}</span>
        <span className="font-medium text-sm text-gray-500 leading-snug truncate">{member.name}</span>
      </div>
      <TrendIcon trend="up" />
      <span className="min-w-[150px] text-right font-bold text-lg whitespace-nowrap">
        {formatCents(member.balanceCents)}
      </span>
    </li>
  );
};

export default MemberItem;
