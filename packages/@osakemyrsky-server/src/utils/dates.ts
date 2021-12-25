import * as dateFns from "date-fns";

export const parse = (date: string | Date) => (date instanceof Date ? date : dateFns.parseISO(date));

export const formatISODate = (date: string | Date) => {
  const parsedDate = date instanceof Date ? date : parse(date);
  return dateFns.format(parsedDate, "yyyy-MM-dd");
};

export const isBefore = (date: string | Date, compareTo: string | Date) => {
  return dateFns.isBefore(parse(date), parse(compareTo));
};

export const isAfter = (date: string | Date, compareTo: string | Date) => {
  return dateFns.isAfter(parse(date), parse(compareTo));
};

export const isSameDay = (first: string | Date, second: string | Date) => {
  return dateFns.isSameDay(parse(first), parse(second));
};

export const compareAsc = (first: string | Date, second: string | Date) => {
  return dateFns.compareAsc(parse(first), parse(second));
};

export const compareDesc = (first: string | Date, second: string | Date) => {
  return dateFns.compareDesc(parse(first), parse(second));
};
