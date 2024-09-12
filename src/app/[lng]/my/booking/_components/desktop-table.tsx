import React, { useState } from "react";
import { format, startOfWeek, addDays, add, startOfDay } from "date-fns";
import { dateToHour } from "@/lib/utils/time";
import { Booking } from "@prisma/client";

export function DesktopTable({
  selectedStudio,
  peopleCount,
  selectedSlots,
  onSlotClick,
  getWeekDates,
  getPrice,
  disabled,
  unavailableBookings,
}: {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: number[];
  onSlotClick: (hour: number) => void;
  getWeekDates: (startDate: Date) => Date[];
  getPrice: (hour: number, peopleCount: number) => number;
  disabled: boolean;
  unavailableBookings: Booking[];
}) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const weekDates = getWeekDates(currentWeekStart);

  const handleWeekClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    step: number,
  ) => {
    e.preventDefault();
    setCurrentWeekStart(addDays(currentWeekStart, step));
  };

  const bookings = new Map(unavailableBookings.map((i) => [i.hour, i]));
  const days = 7;

  const start = startOfDay(new Date());
  const end = startOfDay(add(start, { days })); // Exclusive

  const datedDays = Array.from({ length: days }, (_, i) => addDays(start, i));

  const startHour = 9;
  const endHour = 23;

  const getHours = (day: Date) => {
    const start = dateToHour(startOfDay(day));
    return Array.from(
      { length: endHour - startHour },
      (_, i) => startHour + i,
    ).map((hour) => start + hour);
  };

  return (
    <>
      <div className="">
        <button
          className="btn"
          onClick={(e) => handleWeekClick(e, -7)}
          disabled={disabled}
        >
          Предыдущая неделя
        </button>
        <button
          className="btn ml-4"
          onClick={(e) => handleWeekClick(e, 7)}
          disabled={disabled}
        >
          Следующая неделя
        </button>
      </div>
      <div>
        <table className="table-compact table w-full">
          <thead>
            <tr>
              <th>Time</th>
              {weekDates.map((date, index) => (
                <th key={index}>{format(date, "EEE d")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: endHour - startHour },
              (_, i) => startHour + i,
            ).map((_, hour) => (
              <tr key={hour}>
                <td>{`${hour}:00`}</td>
                {weekDates.map((date, dayIndex) => {
                  const isUnavailable = unavailableBookings.some((booking) => {
                    return (
                      booking.hour === hour && booking.studio === selectedStudio
                    );
                  });
                  const price = getPrice(hour, peopleCount);
                  const slotKey = dateToHour(add(date, { hours: hour }));
                  const isSelected = selectedSlots.indexOf(slotKey) !== -1;

                  return (
                    <td
                      key={dayIndex}
                      className={`${isUnavailable ? "bg-base-300" : `cursor-pointer ${isSelected ? "bg-primary text-primary-content hover:bg-base-content" : "hover:bg-primary-content"}`}`}
                      onClick={() =>
                        !isUnavailable && !disabled && onSlotClick(slotKey)
                      }
                    >
                      ${price}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
