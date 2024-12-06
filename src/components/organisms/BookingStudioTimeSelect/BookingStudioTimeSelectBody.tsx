import clsx from "clsx";

import Typography from "@/components/atoms/Typography/Typography";
import VerticalTimeline from "@/components/atoms/VerticalTimeline/VerticalTimeline";
import { StudioId } from "@/lib/types";
import { getAllStudios } from "@/lib/utils/studios";

import { SelectedTimeSlot } from "./BookingStudioTimeSelect";

interface BookingStudioTimeSelectBodyStudioProps {
  studio: StudioId;
  day: Date;
  studioTimeSlots: StudioTimeSlotInfoWithAvailable[];
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingStudioTimeSelectBodyStudio = ({
  studio,
  studioTimeSlots,
}: BookingStudioTimeSelectBodyStudioProps) => {
  return (
    <div className="flex flex-col flex-1 w-32 divide-y divide-outline-variant">
      {studioTimeSlots.map((timeSlot) => (
        <div
          key={`${studio}-${timeSlot.slotTime}`}
          className="shrink-0 h-12 bg-surface-container-lowest p-2"
        >
          <Typography
            variant={"label"}
            size="medium"
            className={clsx(
              "shrink-0",
              "flex items-center justify-center",
              "w-full h-full rounded-[8px]",
              timeSlot.available
                ? "bg-surface-container"
                : "bg-surface-container-lowest",
            )}
          >
            {timeSlot.price}
          </Typography>
        </div>
      ))}
    </div>
  );
};

interface BookingStudioTimeSelectBodyProps {
  day: Date;
  workingHours: [number, number];
  availableTimeSlots: Map<StudioId, StudioTimeSlotInfo[]>;
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

export type StudioTimeSlotInfo = {
  slotTime: Date;
  price: number;
};

type StudioTimeSlotInfoWithAvailable = StudioTimeSlotInfo & {
  available: boolean;
};

const BookingStudioTimeSelectBody = ({
  day,
  workingHours,
  availableTimeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectBodyProps) => {
  /**
   * Generates an array of time slots for a given range of hours on the specified day.
   * Each time slot is marked as available or unavailable based on the provided list of available time slots.
   *
   * @param startHour - The starting hour for generating time slots.
   * @param endHour - The ending hour for generating time slots.
   * @param availableTimeSlots - An array of available time slots with their respective prices.
   * @returns An array of StudioTimeSlotInfoWithAvailable objects representing each hour in the range,
   *          marked as available if present in the availableTimeSlots, otherwise unavailable with a price of 0.
   */
  const generateTimeSlots = (
    startHour: number,
    endHour: number,
    availableTimeSlots: StudioTimeSlotInfo[],
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

  const filledTimeSlots = new Map<
    StudioId,
    StudioTimeSlotInfoWithAvailable[]
  >();

  getAllStudios().forEach((studio) => {
    const studioSlots = availableTimeSlots.get(studio) ?? [];
    filledTimeSlots.set(
      studio,
      generateTimeSlots(workingHours[0], workingHours[1], studioSlots),
    );
  });

  return (
    <div className="flex flex-row h-full overflow-y-scroll">
      <div className="flex-shrink-0 h-full">
        <VerticalTimeline
          startHour={workingHours[0]}
          endHour={workingHours[1]}
          cellHeight="calc(3rem)"
        />
      </div>
      <div className="flex flex-row rounded-br-[16px] divide-x divide-outline-variant flex-grow">
        {getAllStudios().map((studio) => (
          <BookingStudioTimeSelectBodyStudio
            key={studio}
            studio={studio}
            day={day}
            studioTimeSlots={filledTimeSlots.get(studio) ?? []}
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingStudioTimeSelectBody;
