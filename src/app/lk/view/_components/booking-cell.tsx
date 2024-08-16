import { Studio } from "@/lib/types";
import { Booking } from "@prisma/client";

export function BookingCell({
  hours,
  studio,
  bookings,
  cellHeight,
  getColor,
}: {
  hours: number[];
  studio: Studio;
  bookings: Map<number, Booking>;
  cellHeight: number;
  getColor: (studio: Studio) => string;
}) {
  const elements: React.ReactNode[] = [];
  for (let i = 0; i < hours.length; ) {
    if (bookings.has(hours[i]) && bookings.get(hours[i])!.studio === studio) {
      let count = 0;
      const orderId = bookings.get(hours[i])!.orderId;
      while (
        bookings.has(hours[i]) &&
        bookings.get(hours[i])!.studio === studio &&
        bookings.get(hours[i])!.orderId === orderId
      ) {
        count++;
        i++;
      }
      elements.push(
        <div
          key={hours[i - 1]}
          className="box-border border-t border-gray-500 p-0.5"
          style={{ height: `${cellHeight * count}rem` }}
        >
          <div
            className={`h-full overflow-hidden overflow-ellipsis text-nowrap rounded-md ${getColor(studio)} text-center text-primary-content`}
          />
        </div>,
      );
    } else {
      elements.push(
        <div
          key={hours[i]}
          style={{ height: `${cellHeight}rem` }}
          className="box-border border-t border-gray-500"
        />,
      );
      i++;
    }
  }
  return <>{elements}</>;
}
