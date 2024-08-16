import { dateToHour } from "@/lib/utils/time";
import { addDays, add, format } from "date-fns";
import { useState } from "react";

export function MobileTable({
  selectedStudio,
  peopleCount,
  selectedSlots,
  handleSlotClick,
  getPrice,
  disabled,
}: {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: number[];
  handleSlotClick: (hour: number) => void;
  getPrice: (hour: number, peopleCount: number) => number;
  disabled: boolean;
}) {
  const [currentDay, setCurrentDay] = useState(new Date());

  const handleDayClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    step: number,
  ) => {
    e.preventDefault();
    setCurrentDay(addDays(currentDay, step));
  };

  return (
    <>
      <div className="">
        <button
          className="btn"
          onClick={(e) => handleDayClick(e, -1)}
          disabled={disabled}
        >
          Предыдущий день
        </button>
        <button
          className="btn ml-4"
          onClick={(e) => handleDayClick(e, 1)}
          disabled={disabled}
        >
          Следующий день
        </button>
      </div>
      <div>
        <table className="table-compact table w-full">
          <thead>
            <tr>
              <th>Time</th>
              <th>{format(currentDay, "EEE d")}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 24 }).map((_, hour) => {
              const isUnavailable = !(currentDay.getDay() % 7);
              const price = getPrice(hour, peopleCount);
              const slotKey = dateToHour(add(currentDay, { hours: hour }));
              const isSelected = selectedSlots.indexOf(slotKey) !== -1;

              return (
                <tr key={hour}>
                  <td>{`${hour}:00`}</td>
                  <td
                    className={`${isUnavailable ? "bg-gray-300" : "cursor-pointer hover:bg-primary-content"} ${isSelected ? "bg-primary text-primary-content hover:bg-base-content" : ""}`}
                    onClick={() =>
                      !isUnavailable && !disabled && handleSlotClick(slotKey)
                    }
                  >
                    ${price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
