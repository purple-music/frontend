import { Booking } from "@prisma/client";

import DayStudioColumn from "@/components/organisms/Timetable/DayStudioColumn";
import { StudioId } from "@/lib/types";

export function DayColumn({
  studio,
  bookings,
  cellHeight,
  cellMinWidth,
  hours,
}: {
  studio: StudioId;
  bookings: Map<number, Booking>;
  cellHeight: string;
  cellMinWidth: string;
  hours: number[];
}) {
  return (
    <div className="flex-1">
      <div className="flex flex-col border-r border-dashed border-base-200">
        <DayStudioColumn
          hours={hours}
          studio={studio}
          bookings={bookings}
          cellHeight={cellHeight}
          cellMinWidth={cellMinWidth}
        />
      </div>
    </div>
  );
}

