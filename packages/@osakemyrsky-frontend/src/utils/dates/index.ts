import {
  parseISO,
  format as dateFnsFormat,
  isBefore as dateFnsIsBefore,
  isAfter as dateFnsIsAfter,
  isSameDay as dateFnsIsSameDay
} from "date-fns";

export const parseDate = (date: string | Date) => (date instanceof Date ? date : parseISO(date));

export const currentISODay = () => formatISODay(new Date());

export const format = (date: string | Date, format: string) => {
  const parsedDate = date instanceof Date ? date : parseDate(date);
  return dateFnsFormat(parsedDate, format);
};

export const formatISODay = (date: string | Date) => {
  const parsedDate = date instanceof Date ? date : parseDate(date);
  return dateFnsFormat(parsedDate, "yyyy-MM-dd");
};

export const isISODayBefore = (day: string, compareTo: string | Date) => {
  const parsedDay = parseDate(day);
  const parsedCompareTo = parseDate(compareTo);
  return !dateFnsIsSameDay(parsedDay, parsedCompareTo) && dateFnsIsBefore(parsedDay, parsedCompareTo);
};

export const isISODayAfter = (day: string | Date, compareTo: string | Date) => {
  const parsedDay = parseDate(day);
  const parsedCompareTo = parseDate(compareTo);
  return !dateFnsIsSameDay(parsedDay, parsedCompareTo) && dateFnsIsAfter(parsedDay, parseDate(parsedCompareTo));
};

export const isISODaySameDay = (day: string, compareTo: string | Date) => {
  return dateFnsIsSameDay(parseDate(day), parseDate(compareTo));
};
