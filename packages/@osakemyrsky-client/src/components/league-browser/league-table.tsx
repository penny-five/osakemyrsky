import Link from "next/link";

import LeagueStatusBadge from "../league-status-badge";

import AvatarStack from "@/components/avatar-stack";
import { useUser } from "@/providers/user";
import { League } from "@/types/league";
import { formatDayRange } from "@/utils/dates/display";

export interface LeagueTableProps {
  leagues: League[];
}

const LeagueTable = ({ leagues }: LeagueTableProps) => {
  const { user } = useUser();

  return (
    <table className="flex flex-col w-full">
      <thead className="">
        <tr className="flex w-full font-bold text-gray-600 border-b-1 border-gray-400">
          <th className="flex-grow p-4 text-left">Liigan nimi</th>
          <th className="w-[15%] p-4 text-left">Osallistujat</th>
          <th className="w-[20%] p-4 text-left">Aikataulu</th>
          <th className="w-[15%] p-4 text-left">Tilanne</th>
        </tr>
      </thead>
      <tbody className="flex flex-col w-full my-4 gap-4">
        {leagues.map(league => (
          <tr key={league.id} className="flex items-center w-full bg-gray-200 rounded-xl">
            <td className="flex-grow p-4 font-bold text-lg">
              <Link
                href={{
                  pathname: "/leagues/[id]",
                  query: { id: league.id }
                }}
                passHref
              >
                <a className="hover:underline">{league.name}</a>
              </Link>
            </td>
            <td className="p-4 w-[15%]">
              <AvatarStack
                pictures={league.members.map(member => ({
                  url: member.picture,
                  isUser: member.userId === user?.id
                }))}
              />
            </td>
            <td className="p-4 w-[20%] font-semibold text-base">{formatDayRange(league.startDate, league.endDate)}</td>
            <td className="p-4 w-[15%]">
              <LeagueStatusBadge status={league.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueTable;
