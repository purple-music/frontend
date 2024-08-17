import { DayColumn } from "@/app/lk/view/_components/day-column";
import { StudioId } from "@/lib/types";
import { Booking } from "@prisma/client";

export function DayView({
  bookings,
  cellHeight,
  hours,
  studios,
}: {
  bookings: Map<number, Booking>;
  cellHeight: number;
  hours: number[];
  studios: StudioId[];
}) {
  return (
    <div className="flex flex-row">
      {studios.map((studio) => (
        <DayColumn
          key={studio}
          studio={studio}
          bookings={bookings}
          cellHeight={cellHeight}
          hours={hours}
        />
      ))}
    </div>
  );
}
