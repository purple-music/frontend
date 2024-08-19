import React, { useState } from "react";
import { Hour, StudioId } from "@/lib/types";
import { MobileTable } from "@/app/lk/booking/_components/mobile-table";
import { DesktopTable } from "@/app/lk/booking/_components/desktop-table";
import { add, addDays, format, startOfDay } from "date-fns";
import { Booking } from "@prisma/client";
import { StartDaySelector } from "@/app/lk/booking/_components/start-day-selector";
import { dateToHour, hourToDate } from "@/lib/utils/time";
import { getPriceRate } from "@/app/lk/booking/_data/prices";
import { TimeColumn } from "@/components/tables/time-column";

type DayDuration = {
  prevLabel: string;
  nextLabel: string;
  days: number;
};

const mobileDuration: DayDuration = {
  prevLabel: "Предудыщий день",
  nextLabel: "Следующий день",
  days: 1,
};

const desktopDuration: DayDuration = {
  prevLabel: "Предудыщая неделя",
  nextLabel: "Следующая неделя",
  days: 7,
};

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
  const getWeekDates = (startDate: Date) => {
    return Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  };

  const isAvailable = (hour: number) =>
    !unavailableBookings.some(
      (booking) => booking.hour === hour && booking.studio === selectedStudio,
    );

  const getPrice = (hour: number) => getPriceRate(hour, peopleCount);

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">Выбор слотов</legend>
      <div className="flex flex-col gap-4 md:hidden">
        <DynamicSlotSelector
          days={3}
          unavailableBookings={unavailableBookings}
          disabled={disabled}
          getPrice={getPrice}
          isAvailable={isAvailable}
          selectedSlots={selectedSlots}
          onSelectedSlots={onSelectedSlots}
        />
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        <DynamicSlotSelector
          days={7}
          unavailableBookings={unavailableBookings}
          disabled={disabled}
          getPrice={getPrice}
          isAvailable={isAvailable}
          selectedSlots={selectedSlots}
          onSelectedSlots={onSelectedSlots}
        />
      </div>
    </fieldset>
  );
}

export function DynamicSlotSelector({
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
        onPrevClick={() => setCurrentStart(addDays(currentStart, days))}
        onNextClick={() => setCurrentStart(addDays(currentStart, -days))}
        prevLabel={"Пред"}
        nextLabel={"След"}
        disabled={disabled}
      />
      <DynamicTable
        days={days}
        unavailableBookings={unavailableBookings}
        disabled={disabled}
        start={currentStart}
        selectedSlots={selectedSlots}
        onSlotClick={onSlotClick}
        getPrice={getPrice}
        isAvailable={isAvailable}
      />
    </>
  );
}

export function DynamicTable({
  days,
  unavailableBookings: data,
  disabled,
  start,
  selectedSlots,
  onSlotClick,
  getPrice,
  isAvailable,
}: {
  days: number;
  unavailableBookings: Booking[];
  disabled: boolean;
  start: Date;
  selectedSlots: number[];
  onSlotClick: (hour: number) => void;
  getPrice: (hour: Hour) => number;
  isAvailable: (hour: Hour) => boolean;
}) {
  const end = startOfDay(add(start, { days })); // Exclusive
  const bookings = new Map(data.map((i) => [i.hour, i]));

  const datedDays = Array.from({ length: days }, (_, i) => addDays(start, i));

  const startHour = 9;
  const endHour = 23;

  const cellHeight = 2;

  const getHours = (day: Date) => {
    const start = dateToHour(startOfDay(day));
    return Array.from(
      { length: endHour - startHour },
      (_, i) => startHour + i,
    ).map((hour) => start + hour);
  };

  return (
    <div className="flex w-full flex-row">
      <div className={"divide-y divide-base-300"}>
        <div style={{ height: `${cellHeight}rem` }} />
        <TimeColumn
          cellHeight={cellHeight}
          startHour={startHour}
          endHour={endHour}
        />
      </div>
      <div className="flex flex-1 flex-row">
        {datedDays.map((day, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col divide-y divide-base-300 border-l border-base-content"
          >
            <div className="text-center" style={{ height: `${cellHeight}rem` }}>
              {format(day, "dd")}
            </div>
            <div className="flex flex-col divide-y divide-base-300">
              {getHours(day).map((hour) => {
                const price = getPrice(hour);
                const isUnavailable = !isAvailable(hour);
                const slotKey = hour;
                const isSelected = selectedSlots.indexOf(slotKey) !== -1;

                return (
                  <div
                    key={hour}
                    style={{ height: `${cellHeight}rem` }}
                    className={`box-border flex items-center justify-start px-2 ${isUnavailable ? "bg-base-300" : `cursor-pointer ${isSelected ? "bg-primary text-primary-content hover:bg-base-content" : "hover:bg-primary-content"}`}`}
                    onClick={() => {
                      console.log(hourToDate(slotKey));
                      return (
                        !isUnavailable && !disabled && onSlotClick(slotKey)
                      );
                    }}
                  >
                    {price}
                  </div>
                );
              })}
            </div>

            {/* <DayView
              hours={getHours(day)}
              cellHeight={cellHeight}
              bookings={bookings}
              studios={studios}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
