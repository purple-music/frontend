import { Booking } from "@prisma/client";

import { DayColumn } from "@/components/organisms/Timetable/DayColumn";
import { StudioId } from "@/lib/types";

export function DayView({
  bookings,
  cellHeight,
  cellMinWidth,
  hours,
  studios,
}: {
  bookings: Map<number, Booking>;
  cellHeight: string;
  cellMinWidth: string;
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
          cellMinWidth={cellMinWidth}
          hours={hours}
        />
      ))}
    </div>
  );
}

