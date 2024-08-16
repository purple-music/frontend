import { DayColumn } from "@/app/lk/view/_components/day-column";
import { Studio } from "@/lib/types";
import { Booking } from "@prisma/client";

const studios: Studio[] = ["purple", "orange", "blue"];

export function DayView({
  bookings,
  cellHeight,
  hours,
}: {
  bookings: Map<number, Booking>;
  cellHeight: number;
  hours: number[];
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
