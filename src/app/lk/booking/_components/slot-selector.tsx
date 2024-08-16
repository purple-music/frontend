import React from "react";
import { Hour } from "@/lib/types";
import { MobileTable } from "@/app/lk/booking/_components/mobile-table";
import { DesktopTable } from "@/app/lk/booking/_components/desktop-table";
import { addDays } from "date-fns";

interface SlotSelectorProps {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: Hour[];
  handleSlotClick: (hour: Hour) => void;
  getPrice: (hour: number, peopleCount: number) => number;
  disabled: boolean;
}

function SlotSelector({
  selectedStudio,
  peopleCount,
  selectedSlots,
  handleSlotClick,
  getPrice,
  disabled,
}: SlotSelectorProps) {
  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  };

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">Выбор слотов</legend>
      <div className="flex flex-col gap-4 md:hidden">
        <MobileTable
          selectedStudio={selectedStudio}
          peopleCount={peopleCount}
          selectedSlots={selectedSlots}
          handleSlotClick={handleSlotClick}
          getPrice={getPrice}
          disabled={disabled}
        />
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        <DesktopTable
          selectedStudio={selectedStudio}
          peopleCount={peopleCount}
          selectedSlots={selectedSlots}
          handleSlotClick={handleSlotClick}
          getPrice={getPrice}
          getWeekDates={getWeekDates}
          disabled={disabled}
        />
      </div>
    </fieldset>
  );
}

export default SlotSelector;
