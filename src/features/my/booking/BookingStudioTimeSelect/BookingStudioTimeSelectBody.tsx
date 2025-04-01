import clsx from "clsx";
import { format } from "date-fns";

import { FreeSlot } from "@/api/queries/free-slots/free-slots";
import VerticalTimeline from "@/components/shared/VerticalTimeline/VerticalTimeline";
import { getTypographyStyles } from "@/components/ui/Typography/Typography";
import { FreeSlotsGroupedByStudio } from "@/lib/utils/time-slots";

import { SelectedTimeSlot, isSlotSame } from "./BookingStudioTimeSelect";

interface BookingStudioTimeSelectBodyStudioProps {
  studio: string;
  studioPrices: FreeSlot[];
  selectedTimeSlots: SelectedTimeSlot[];
  onSlotClick: (timeSlots: SelectedTimeSlot) => void;
}

const BookingStudioTimeSelectBodyStudio = ({
  studio,
  studioPrices,
  selectedTimeSlots,
  onSlotClick,
}: BookingStudioTimeSelectBodyStudioProps) => {
  const { style, className } = getTypographyStyles("label", "medium");

  return (
    <div className="flex flex-1 flex-col divide-y divide-outline-variant">
      {studioPrices.map((timeSlot) => (
        <div
          key={`${studio}-${timeSlot.startTime}`}
          className="h-12 shrink-0 bg-surface-container-lowest p-2"
        >
          <button
            style={style}
            onClick={() =>
              onSlotClick({
                studio,
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
              })
            }
            className={clsx(
              className,
              "shrink-0",
              "flex items-center justify-center",
              "h-full w-full rounded-[8px]",
              // timeSlot.available
              //   ? "bg-surface-container"
              //   : "cursor-not-allowed bg-surface-container-lowest",
              "bg-surface-container",
              selectedTimeSlots.find((slot) =>
                isSlotSame(slot, {
                  studio,
                  startTime: timeSlot.startTime,
                  endTime: timeSlot.endTime,
                }),
              )
                ? "!bg-secondary-container !text-on-secondary-container"
                : "",
            )}
          >
            {format(new Date(timeSlot.startTime), "HH:mm")} -{" "}
            {format(new Date(timeSlot.endTime), "HH:mm")} {timeSlot.price}
          </button>
        </div>
      ))}
    </div>
  );
};

interface BookingStudioTimeSelectBodyProps {
  day: Date;
  workingHours: [number, number];
  freeSlotsGroupedByStudio: FreeSlotsGroupedByStudio;
  selectedTimeSlots: SelectedTimeSlot[];
  onSlotClick: (slot: SelectedTimeSlot) => void;
}

const BookingStudioTimeSelectBody = ({
  workingHours,
  freeSlotsGroupedByStudio,
  selectedTimeSlots,
  onSlotClick,
}: BookingStudioTimeSelectBodyProps) => {
  return (
    <div className="flex h-full flex-row overflow-y-scroll">
      <div className="h-full flex-shrink-0">
        <VerticalTimeline
          startHour={workingHours[0]}
          endHour={workingHours[1]}
          cellHeight="calc(3rem)"
        />
      </div>
      <div className="flex flex-1 flex-row divide-x divide-outline-variant rounded-br-[16px]">
        {Object.entries(freeSlotsGroupedByStudio).map(
          ([studioId, freeSlots]) => {
            return (
              <BookingStudioTimeSelectBodyStudio
                key={studioId}
                studio={studioId}
                studioPrices={freeSlots}
                selectedTimeSlots={selectedTimeSlots}
                onSlotClick={onSlotClick}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectBody;
