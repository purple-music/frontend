import Surface from "@/components/atoms/Surface/Surface";
import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";

import BookingStudioTimeSelectBody from "./BookingStudioTimeSelectBody";
import BookingStudioTimeSelectHeader from "./BookingStudioTimeSelectHeader";

export type StudioTimeSlotInfo = {
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
  availableTimeSlots: Map<StudioId, StudioTimeSlotInfo[]>;
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingStudioTimeSelect = ({
  day,
  workingHours,
  availableTimeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectProps) => {
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
        studios={Array.from(availableTimeSlots.keys())}
      />
      <BookingStudioTimeSelectBody
        day={day}
        workingHours={workingHours}
        availableTimeSlots={availableTimeSlots}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
    </Surface>
  );
};

export default BookingStudioTimeSelect;
