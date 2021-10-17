import * as dateFns from "date-fns";

const parse = (date: string | Date) => (date instanceof Date ? date : dateFns.parseISO(date));

export const isBefore = (date: string | Date, compareTo: string | Date) => {
  return dateFns.isBefore(parse(date), parse(compareTo));
};

export const isAfter = (date: string | Date, compareTo: string | Date) => {
  return dateFns.isAfter(parse(date), parse(compareTo));
};

export const isSameDay = (first: string | Date, second: string | Date) => {
  return dateFns.isSameDay(parse(first), parse(second));
};
