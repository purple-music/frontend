import { Hour } from "@/lib/types";

export const hourToDate = (hour: Hour) => {
  return new Date(hour * 60 * 60 * 1000);
};

export const dateToHour = (date: Date) => {
  return Math.floor(date.getTime() / (60 * 60 * 1000));
};
