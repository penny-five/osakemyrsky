/**
 * Various utilities for displaying dates on UI.
 */

import { format } from "date-fns";

import { parseDate } from ".";

export const formatDayRange = (from: string, to: string) => {
  return `${format(parseDate(from), "d.M.yyyy")} -  ${format(parseDate(to), "d.M.yyyy")}`;
};
