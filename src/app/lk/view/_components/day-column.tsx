import { BookingCell } from "@/app/lk/view/_components/booking-cell";
import { StudioId } from "@/lib/types";
import { Booking } from "@prisma/client";

const getShort = (studio: StudioId) => {
  switch (studio) {
    case "blue":
      return "B";
    case "purple":
      return "P";
    case "orange":
      return "O";
  }
};

const getSoftColor = (studio: StudioId) => {
  switch (studio) {
    case "blue":
      return "bg-blue-300";
    case "purple":
      return "bg-purple-300";
    case "orange":
      return "bg-orange-300";
  }
};

const getColor = (studio: StudioId) => {
  switch (studio) {
    case "blue":
      return "bg-blue-500";
    case "purple":
      return "bg-purple-500";
    case "orange":
      return "bg-orange-500";
  }
};

export function DayColumn({
  studio,
  bookings,
  cellHeight,
  hours,
}: {
  studio: StudioId;
  bookings: Map<number, Booking>;
  cellHeight: number;
  hours: number[];
}) {
  return (
    <div className="flex-1">
      <div
        className={`flex w-full items-center justify-center ${getSoftColor(studio)}`}
        style={{ height: `${cellHeight}rem` }}
      >
        {getShort(studio)}
      </div>
      <div className="flex flex-col border-r border-dashed border-base-200">
        <BookingCell
          hours={hours}
          studio={studio}
          bookings={bookings}
          cellHeight={cellHeight}
          getColor={getColor}
        />
      </div>
    </div>
  );
}
