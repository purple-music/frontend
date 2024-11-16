import Surface from "@/components/atoms/Surface/Surface";
import { StudioId } from "@/lib/types";

import BookingStudioTimeSelectBody from "./BookingStudioTimeSelectBody";
import BookingStudioTimeSelectHeader from "./BookingStudioTimeSelectHeader";

export type StudioTimeSlotInfo = {
  slotTime: Date;
  available: boolean;
  price: number;
};

export type SelectedTimeSlot = {
  slotTime: Date;
  studio: StudioId;
};

interface BookingStudioTimeSelectProps {
  day: Date;
  timeSlots: Map<StudioId, StudioTimeSlotInfo>;
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingStudioTimeSelect = ({
  day,
  timeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectProps) => {
  return (
    <Surface className="h-96 box-content w-[calc(3rem+8rem+8rem+8rem)] overflow-hidden relative">
      <BookingStudioTimeSelectHeader
        day={day}
        studios={Array.from(timeSlots.keys())}
      />
      <BookingStudioTimeSelectBody
        day={day}
        timeSlots={timeSlots}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
    </Surface>
  );
};

export default BookingStudioTimeSelect;
