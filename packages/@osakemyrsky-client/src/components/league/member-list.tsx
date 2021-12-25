import MemberItem from "./member-item";

import { useUser } from "@/providers/user";
import { Member } from "@/types/member";

export interface MemberListProps {
  leagueId: string;
  members: Member[];
}

const MemberList = ({ leagueId, members }: MemberListProps) => {
  const { user } = useUser();

  return (
    <ul className="flex flex-col w-full items-stretch gap-4">
      {members.map(member => (
        <MemberItem key={member.id} leagueId={leagueId} member={member} isUser={user?.id === member.user.id} />
      ))}
    </ul>
  );
};

export default MemberList;
