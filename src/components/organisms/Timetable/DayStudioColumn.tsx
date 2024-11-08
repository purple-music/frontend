import { Booking } from "@prisma/client";

import { StudioId } from "@/lib/types";
import { getStudioColor } from "@/lib/utils/studios";

interface EmptyBookingCellProps {
  cellHeight: string;
  cellMinWidth: string;
}

const EmptyBookingCell = ({
  cellHeight,
  cellMinWidth,
}: EmptyBookingCellProps) => (
  <div
    style={{ height: cellHeight, minWidth: cellMinWidth }}
    className="box-border border-t border-gray-500"
  />
);

interface BookedBookingCellProps {
  bookedCellHeight: string;
  cellMinWidth: string;
  cellColor: string;
}

const BookedBookingCell = ({
  bookedCellHeight,
  cellMinWidth,
  cellColor,
}: BookedBookingCellProps) => (
  <div
    className="box-border border-t border-gray-500 p-0.5"
    style={{
      height: bookedCellHeight,
      minWidth: cellMinWidth,
    }}
  >
    <div
      className={`h-full overflow-hidden overflow-ellipsis text-nowrap rounded-md ${cellColor} text-center text-primary-content`}
    />
  </div>
);

interface BookingCellProps {
  hours: number[];
  studio: StudioId;
  bookings: Map<number, Booking>;
  cellHeight: string;
  cellMinWidth: string;
}

const DayStudioColumn = ({
  hours,
  studio,
  bookings,
  cellHeight,
  cellMinWidth,
}: BookingCellProps) => {
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
        <BookedBookingCell
          key={hours[i - 1]}
          bookedCellHeight={`calc(${cellHeight} * ${count})`}
          cellMinWidth={cellMinWidth}
          cellColor={getStudioColor(studio)}
        />,
      );
    } else {
      elements.push(
        <EmptyBookingCell
          key={hours[i]}
          cellHeight={cellHeight}
          cellMinWidth={cellMinWidth}
        />,
      );
      i++;
    }
  }
  return <>{elements}</>;
};

export default DayStudioColumn;

