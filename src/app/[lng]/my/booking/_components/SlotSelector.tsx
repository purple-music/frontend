import { addDays, startOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TbCaretLeftFilled, TbCaretRightFilled } from "react-icons/tb";

import { Booking } from "@prisma/client";

// import { BookingTable } from "@/app/[lng]/my/booking/_components/BookingTable";
import { StartDaySelector } from "@/app/[lng]/my/booking/_components/StartDaySelector";
import { getPriceRate } from "@/app/[lng]/my/booking/_data/prices";
import { Hour } from "@/lib/types";

interface SlotSelectorProps {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: Hour[];
  onSelectedSlots: (slots: Hour[]) => void;
  disabled: boolean;
  unavailableBookings: Booking[];
}

export function SlotSelector({
  selectedStudio,
  peopleCount,
  selectedSlots,
  onSelectedSlots,
  disabled,
  unavailableBookings,
}: SlotSelectorProps) {
  const t = useTranslations("my");
  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  };

  //   const isAvailable = (hour: number) =>
  //     !unavailableBookings.some(
  //       (booking) => booking.hour === hour && booking.studio === selectedStudio,
  //     );

  const getPrice = (hour: number) => getPriceRate(hour, peopleCount);

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">{t("booking.form.slots")}</legend>
      <div className="flex flex-col gap-4 md:hidden">
        {/* <SlotSelectorTable
          days={3}
          unavailableBookings={unavailableBookings}
          disabled={disabled}
          getPrice={getPrice}
          isAvailable={isAvailable}
          selectedSlots={selectedSlots}
          onSelectedSlots={onSelectedSlots}
        /> */}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {/* <SlotSelectorTable
          days={7}
          unavailableBookings={unavailableBookings}
          disabled={disabled}
          getPrice={getPrice}
          isAvailable={isAvailable}
          selectedSlots={selectedSlots}
          onSelectedSlots={onSelectedSlots}
        /> */}
      </div>
    </fieldset>
  );
}

export function SlotSelectorTable({
  days,
  unavailableBookings,
  disabled,
  selectedSlots,
  onSelectedSlots,
  getPrice,
  isAvailable,
}: {
  days: number;
  unavailableBookings: Booking[];
  disabled: boolean;
  selectedSlots: number[];
  onSelectedSlots: (slots: number[]) => void;
  getPrice: (hour: number) => number;
  isAvailable: (hour: Hour) => boolean;
}) {
  const [currentStart, setCurrentStart] = useState(startOfDay(new Date()));

  const onSlotClick = (hour: Hour) => {
    if (selectedSlots.includes(hour)) {
      onSelectedSlots(selectedSlots.filter((h) => h !== hour));
    } else {
      onSelectedSlots([...selectedSlots, hour]);
    }
  };

  return (
    <>
      <StartDaySelector
        onPrevClick={() => setCurrentStart(addDays(currentStart, -1))}
        onNextClick={() => setCurrentStart(addDays(currentStart, 1))}
        prevLabel={<TbCaretLeftFilled />}
        nextLabel={<TbCaretRightFilled />}
        disabled={disabled}
        day={currentStart}
      />
      {/* <BookingTable
        days={days}
        unavailableBookings={unavailableBookings}
        disabled={disabled}
        start={currentStart}
        selectedSlots={selectedSlots}
        onSlotClick={onSlotClick}
        getPrice={getPrice}
        isAvailable={isAvailable}
      /> */}
    </>
  );
}

