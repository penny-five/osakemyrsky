import Avatar from "@/atoms/avatar";
import TrendIcon from "@/atoms/trend-icon";
import { Member } from "@/types/member";

export interface SimpleStockItemProps {
  member: Member;
  isUser: boolean;
}

const MemberItem = ({ member, isUser }: SimpleStockItemProps) => {
  return (
    <li className="flex items-center py-4 px-5 gap-4 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300">
      <Avatar url={member.picture} hightlight={isUser} />
      <div className="flex-grow flex flex-col truncate">
        <span className="font-semibold text-lg leading-snug truncate">{member.companyName}</span>
        <span className="font-medium text-gray-500 leading-snug truncate">{member.name}</span>
      </div>
      <TrendIcon trend="up" />
      <span className="font-semibold text-lg whitespace-nowrap">100 000 €</span>
    </li>
  );
};

export default MemberItem;
