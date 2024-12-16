import { Booking } from "@prisma/client";

import { SlotSelector } from "@/app/[locale]/my/booking/_components/SlotSelector";
import { Hour } from "@/lib/types";

interface SlotSelectorWrapperProps {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: Hour[];
  onSelectedSlots: (slots: Hour[]) => void;
  disabled: boolean;
  refreshBookings: () => void;
  bookings: Booking[];
}

export function SlotSelectorWrapper({
  selectedStudio,
  peopleCount,
  selectedSlots,
  onSelectedSlots,
  disabled,
  bookings,
}: SlotSelectorWrapperProps) {
  return (
    <SlotSelector
      selectedStudio={selectedStudio}
      peopleCount={peopleCount}
      selectedSlots={selectedSlots}
      onSelectedSlots={onSelectedSlots}
      disabled={disabled}
      unavailableBookings={bookings}
    />
  );
}

