import clsx from "clsx";

import VerticalTimeline from "@/components/shared/VerticalTimeline/VerticalTimeline";
import { getTypographyStyles } from "@/components/ui/Typography/Typography";
import { StudioId } from "@/lib/types";
import { getAllStudios } from "@/lib/utils/studios";

import {
  BookingSlotInfo,
  SelectedTimeSlot,
  isSlotSame,
} from "./BookingStudioTimeSelect";

interface BookingStudioTimeSelectBodyStudioProps {
  studio: StudioId;
  day: Date;
  studioTimeSlots: StudioTimeSlotInfoWithAvailable[];
  selectedTimeSlots: SelectedTimeSlot[];
  onSlotClick: (timeSlots: SelectedTimeSlot) => void;
}

const BookingStudioTimeSelectBodyStudio = ({
  studio,
  studioTimeSlots,
  selectedTimeSlots,
  onSlotClick,
  day,
}: BookingStudioTimeSelectBodyStudioProps) => {
  const { style, className } = getTypographyStyles("label", "medium");

  return (
    <div className="flex flex-1 flex-col divide-y divide-outline-variant">
      {studioTimeSlots.map((timeSlot) => (
        <div
          key={`${studio}-${timeSlot.slotTime}`}
          className="h-12 shrink-0 bg-surface-container-lowest p-2"
        >
          <button
            style={style}
            onClick={() =>
              timeSlot.available &&
              onSlotClick({ studio, slotTime: timeSlot.slotTime })
            }
            className={clsx(
              className,
              "shrink-0",
              "flex items-center justify-center",
              "h-full w-full rounded-[8px]",
              timeSlot.available
                ? "bg-surface-container"
                : "cursor-not-allowed bg-surface-container-lowest",
              selectedTimeSlots.find((slot) =>
                isSlotSame(slot, {
                  studio,
                  slotTime: timeSlot.slotTime,
                }),
              )
                ? "!bg-secondary-container !text-on-secondary-container"
                : "",
            )}
          >
            {/* TODO: Fix this */}
            {timeSlot.price === 0 ? "🚫" : `$${timeSlot.price}`}
          </button>
        </div>
      ))}
    </div>
  );
};

interface BookingStudioTimeSelectBodyProps {
  day: Date;
  workingHours: [number, number];
  availableTimeSlots: BookingSlotInfo[];
  selectedTimeSlots: SelectedTimeSlot[];
  onSlotClick: (slot: SelectedTimeSlot) => void;
}

export type StudioTimeSlotInfo = {
  slotTime: Date;
  price: number;
};

type StudioTimeSlotInfoWithAvailable = StudioTimeSlotInfo & {
  available: boolean;
};

/**
 * Generates an array of time slots for a given range of hours on the specified day.
 * Each time slot is marked as available or unavailable based on the provided list of available time slots.
 *
 * @param startHour - The starting hour for generating time slots.
 * @param endHour - The ending hour for generating time slots.
 * @param availableTimeSlots - An array of available time slots with their respective prices.
 * @param day - The day for which the time slots are generated.
 * @returns An array of StudioTimeSlotInfoWithAvailable objects representing each hour in the range,
 *          marked as available if present in the availableTimeSlots, otherwise unavailable with a price of 0.
 */
const generateTimeSlots = (
  startHour: number,
  endHour: number,
  availableTimeSlots: StudioTimeSlotInfo[],
  day: Date,
): StudioTimeSlotInfoWithAvailable[] => {
  const timeSlots: StudioTimeSlotInfoWithAvailable[] = [];
  // First we convert availableTimeSlots to a Map
  const availableSlotsMap = new Map(
    availableTimeSlots.map((slot) => [slot.slotTime.getTime(), slot]),
  );

  // For each hour
  for (let hour = startHour; hour < endHour; hour++) {
    // We convert openHour and closeHour to Date objects
    const slotTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hour,
    );
    const slotKey = slotTime.getTime();

    // If the availableSlotsMap has this hour as a key, then it's available
    if (availableSlotsMap.has(slotKey)) {
      const availableSlot = availableSlotsMap.get(slotKey)!;
      timeSlots.push({ ...availableSlot, available: true });
    } else {
      timeSlots.push({ slotTime, price: 0, available: false });
    }
  }

  return timeSlots;
};

export function convertToStudioTimeSlotMap(
  bookingSlots: BookingSlotInfo[],
): Map<StudioId, StudioTimeSlotInfo[]> {
  const studioMap = new Map<StudioId, StudioTimeSlotInfo[]>();

  bookingSlots.forEach(({ studioId, slotTime, price }) => {
    if (!studioMap.has(studioId)) {
      studioMap.set(studioId, []);
    }

    studioMap.get(studioId)!.push({ slotTime, price });
  });

  return studioMap;
}

const BookingStudioTimeSelectBody = ({
  day,
  workingHours,
  availableTimeSlots,
  selectedTimeSlots,
  onSlotClick,
}: BookingStudioTimeSelectBodyProps) => {
  const filledTimeSlots = new Map<
    StudioId,
    StudioTimeSlotInfoWithAvailable[]
  >();

  const availableTimeSlotsMap = convertToStudioTimeSlotMap(availableTimeSlots);

  getAllStudios().forEach((studio) => {
    const studioSlots = availableTimeSlotsMap.get(studio) ?? [];
    filledTimeSlots.set(
      studio,
      generateTimeSlots(workingHours[0], workingHours[1], studioSlots, day),
    );
  });

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
        {getAllStudios().map((studio) => (
          <BookingStudioTimeSelectBodyStudio
            key={studio}
            studio={studio}
            day={day}
            studioTimeSlots={filledTimeSlots.get(studio) ?? []}
            selectedTimeSlots={selectedTimeSlots}
            onSlotClick={onSlotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectBody;
