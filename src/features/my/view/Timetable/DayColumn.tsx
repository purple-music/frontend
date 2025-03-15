import DayStudioColumn from "@/features/my/view/Timetable/DayStudioColumn";
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

export function DayColumn({
  studio,
  bookings,
  cellHeight,
  cellMinWidth,
  hours,
}: {
  studio: StudioId;
  bookings: Map<number, TimeSlot>;
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
