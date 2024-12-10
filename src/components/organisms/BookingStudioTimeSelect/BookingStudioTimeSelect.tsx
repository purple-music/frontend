import Surface from "@/components/atoms/Surface/Surface";
import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";

import BookingStudioTimeSelectBody from "./BookingStudioTimeSelectBody";
import BookingStudioTimeSelectHeader from "./BookingStudioTimeSelectHeader";

export type StudioTimeSlotInfo = {
  slotTime: Date;
  price: number;
};

export type BookingSlotInfo = {
  studioId: StudioId;
  slotTime: Date;
  price: number;
};

export type SelectedTimeSlot = {
  slotTime: Date;
  studio: StudioId;
};

interface BookingStudioTimeSelectProps {
  day: Date;
  workingHours: [number, number];
  availableTimeSlots: BookingSlotInfo[];
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

export const isSlotSame = (
  slot1: SelectedTimeSlot,
  slot2: SelectedTimeSlot,
) => {
  return (
    slot1.slotTime.getTime() === slot2.slotTime.getTime() &&
    slot1.studio === slot2.studio
  );
};

const BookingStudioTimeSelect = ({
  day,
  workingHours,
  availableTimeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectProps) => {
  const onSlotClick = (slot: SelectedTimeSlot) => {
    if (selectedTimeSlots.some((s) => isSlotSame(s, slot))) {
      setSelectedTimeSlots(
        selectedTimeSlots.filter((s) => !isSlotSame(s, slot)),
      );
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slot]);
    }
  };
  return (
    <Surface className="h-96 box-content w-[calc(3rem+8rem+8rem+8rem)] overflow-hidden relative">
      <Typography
        variant={"title"}
        size={"large"}
        className={"h-12 flex items-center justify-center"}
      >
        {day.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
        })}
      </Typography>
      <BookingStudioTimeSelectHeader
        day={day}
        studios={[...new Set(availableTimeSlots.map((s) => s.studioId))]}
      />
      <BookingStudioTimeSelectBody
        day={day}
        workingHours={workingHours}
        availableTimeSlots={availableTimeSlots}
        selectedTimeSlots={selectedTimeSlots}
        onSlotClick={onSlotClick}
      />
    </Surface>
  );
};

export default BookingStudioTimeSelect;
