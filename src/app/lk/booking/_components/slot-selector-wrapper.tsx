import { getAllBookings } from "@/actions/query/booking";
import { SlotSelector } from "@/app/lk/booking/_components/slot-selector";
import { Hour } from "@/lib/types";
import { Booking } from "@prisma/client";
import { useEffect, useState } from "react";

interface SlotSelectorWrapperProps {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: Hour[];
  onSelectedSlots: (slots: Hour[]) => void;
  disabled: boolean;
}

export function SlotSelectorWrapper({
  selectedStudio,
  peopleCount,
  selectedSlots,
  onSelectedSlots,
  disabled,
}: SlotSelectorWrapperProps) {
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    getAllBookings().then((response) => setBookings(response));
  }, []);

  if (!bookings) return <span>SlotSlector Skeleton</span>;

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
