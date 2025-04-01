import { format } from "date-fns";

export type Day = string; // "yyyy-MM-dd"

const stripTime = <TDate extends Date>(date: TDate | string | number): Day =>
  format(date, "yyyy-MM-dd");

export { stripTime };
