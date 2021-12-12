/**
 * Various utilities for displaying dates on UI.
 */

import { format } from "date-fns";

import { parseDate } from ".";

export const formatTimestamp = (datetime: string) => {
  return format(parseDate(datetime), "d.M.yyyy HH:mm");
};

export const formatDay = (day: string) => {
  return format(parseDate(day), "d.M.yyyy");
};

export const formatDayRange = (from: string, to: string) => {
  return `${format(parseDate(from), "d.M.yyyy")} -  ${format(parseDate(to), "d.M.yyyy")}`;
};
