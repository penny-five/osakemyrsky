import Badge, { BadgeColor } from "@/atoms/badge";
import { LeagueStatus } from "@/types/league";

export interface LeagueStatusBadgeProps {
  status: LeagueStatus;
}

const getColor = (status: LeagueStatus): BadgeColor => {
  switch (status) {
    case LeagueStatus.STARTING:
    case LeagueStatus.ONGOING:
      return "blue";
    case LeagueStatus.ENDED:
      return "gray";
  }
};

const getLabel = (status: LeagueStatus) => {
  switch (status) {
    case LeagueStatus.STARTING:
      return "Alkamassa";
    case LeagueStatus.ONGOING:
      return "Käynnissä";
    case LeagueStatus.ENDED:
      return "Päättynyt";
  }
};
const LeagueStatusBadge = ({ status }: LeagueStatusBadgeProps) => {
  return (
    <Badge color={getColor(status)} size="sm">
      {getLabel(status)}
    </Badge>
  );
};

export default LeagueStatusBadge;
