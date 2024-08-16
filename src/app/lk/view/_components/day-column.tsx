import { BookingCell } from "@/app/lk/view/_components/booking-cell";
import { Studio } from "@/lib/types";
import { Booking } from "@prisma/client";

const getShort = (studio: Studio) => {
  switch (studio) {
    case "blue":
      return "B";
    case "purple":
      return "P";
    case "orange":
      return "O";
  }
};

const getSoftColor = (studio: Studio) => {
  switch (studio) {
    case "blue":
      return "bg-blue-300";
    case "purple":
      return "bg-purple-300";
    case "orange":
      return "bg-orange-300";
  }
};

const getColor = (studio: Studio) => {
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
  studio: Studio;
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
      <div className="flex flex-col">
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
