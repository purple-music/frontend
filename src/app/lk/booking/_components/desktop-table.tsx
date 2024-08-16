import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, add } from "date-fns";
import { Hour } from "@/lib/types";
import { dateToHour } from "@/lib/utils/time";
import { getUserById } from "@/actions/query/user";

export function DesktopTable({
  selectedStudio,
  peopleCount,
  selectedSlots,
  handleSlotClick,
  getWeekDates,
  getPrice,
  disabled,
}: {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: number[];
  handleSlotClick: (hour: number) => void;
  getWeekDates: (startDate: Date) => Date[];
  getPrice: (hour: number, peopleCount: number) => number;
  disabled: boolean;
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
            {Array.from({ length: 24 }).map((_, hour) => (
              <tr key={hour}>
                <td>{`${hour}:00`}</td>
                {weekDates.map((date, dayIndex) => {
                  const isUnavailable = !(date.getDay() % 7);
                  const price = getPrice(hour, peopleCount);
                  const slotKey = dateToHour(add(date, { hours: hour }));
                  const isSelected = selectedSlots.indexOf(slotKey) !== -1;

                  return (
                    <td
                      key={dayIndex}
                      className={`${isUnavailable ? "bg-base-300" : `cursor-pointer ${isSelected ? "bg-primary text-primary-content hover:bg-base-content" : "hover:bg-primary-content"}`}`}
                      onClick={() =>
                        !isUnavailable && !disabled && handleSlotClick(slotKey)
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
