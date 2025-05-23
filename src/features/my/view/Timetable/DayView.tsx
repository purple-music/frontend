import { DayColumn } from "@/features/my/view/Timetable/DayColumn";
import { StudioId } from "@/lib/types";

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

export function DayView({
  bookings,
  cellHeight,
  cellMinWidth,
  hours,
  studios,
}: {
  bookings: Map<number, TimeSlot>;
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
