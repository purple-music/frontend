// import { Booking } from "@prisma/client";
import { SlotSelector } from "@/app/[locale]/my/booking/_components/SlotSelector";
import { Hour } from "@/lib/types";

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

interface SlotSelectorWrapperProps {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: Hour[];
  onSelectedSlots: (slots: Hour[]) => void;
  disabled: boolean;
  refreshTimeSlots: () => void;
  timeSlots: TimeSlot[];
}

export function SlotSelectorWrapper({
  selectedStudio,
  peopleCount,
  selectedSlots,
  onSelectedSlots,
  disabled,
  timeSlots,
}: SlotSelectorWrapperProps) {
  return (
    <SlotSelector
      selectedStudio={selectedStudio}
      peopleCount={peopleCount}
      selectedSlots={selectedSlots}
      onSelectedSlots={onSelectedSlots}
      disabled={disabled}
      unavailableTimeSlots={timeSlots}
    />
  );
}
