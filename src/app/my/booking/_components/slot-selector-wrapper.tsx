import { getAllBookings } from "@/actions/query/booking";
import { SlotSelector } from "@/app/my/booking/_components/slot-selector";
import { Hour } from "@/lib/types";
import { Booking } from "@prisma/client";
import { useEffect, useState } from "react";

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
