import { Booking } from "@prisma/client";

import { DayColumn } from "@/app/[lng]/my/view/_components/DayColumn";
import { StudioId } from "@/lib/types";

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
