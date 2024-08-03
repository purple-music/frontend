import { Hour } from "@/lib/types";

export const hourToDate = (hour: Hour) => {
  return new Date(hour * 60 * 60 * 1000);
};

export const dateToHour = (date: Date) => {
  return date.getTime() / (60 * 60 * 1000);
};

class AuthMessageError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthMessageError.prototype);
  }
}
