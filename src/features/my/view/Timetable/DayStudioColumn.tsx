import { ReactNode } from "react";

import { StudioId } from "@/lib/types";
import { getStudioColor } from "@/lib/utils/studios";

// TODO: prisma removed
type TimeSlot = {
  id: number;
  slotTime: Date;
  peopleCount: number;
  createdAt: Date;
  updatedAt: Date;
  studioId: string;
  bookingId: number;
};

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
  bookings: Map<number, TimeSlot>;
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
  const elements: ReactNode[] = [];
  for (let i = 0; i < hours.length; ) {
    const hour = hours[i];
    if (hour === undefined) {
      // Impossible
      break;
    }
    if (bookings.has(hour) && bookings.get(hour)!.studioId === studio) {
      let count = 0;
      const bookingId = bookings.get(hour)!.bookingId;
      while (
        bookings.has(hour) &&
        bookings.get(hour)!.studioId === studio &&
        bookings.get(hour)!.bookingId === bookingId
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
          key={hour}
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
