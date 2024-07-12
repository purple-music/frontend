"use client";

import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";

const studios = [
  { name: 'Blue Studio', id: 'blue', color: 'bg-blue-300' },
  { name: 'Orange Studio', id: 'orange', color: 'bg-orange-300' },
  { name: 'Purple Studio', id: 'purple', color: 'bg-purple-300' }
];

const getWeekDates = (startDate: Date) => {
  return Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
};

const getPrice = (
  hour: number,
  day: number,
  studioId: string,
  peopleCount: number,
) => {
  // Define your pricing logic here
  const basePrice = 50; // Example base price
  const hourlyRate = hour >= 8 && hour < 18 ? 100 : 75; // Example hourly rates
  return basePrice + hourlyRate * peopleCount;
};

export default function Page() {
  const [selectedStudio, setSelectedStudio] = useState(studios[0].id);
  const [peopleCount, setPeopleCount] = useState(1);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [selectedSlots, setSelectedSlots] = useState<Record<string, boolean>>(
    {},
  );

  const weekDates = getWeekDates(currentWeekStart);

  const handleSlotClick = (day: number, hour: number) => {
    const slotKey = `${day}-${hour}`;
    if (!selectedSlots[slotKey]) {
      setSelectedSlots((prev) => ({ ...prev, [slotKey]: true }));
    } else {
      setSelectedSlots((prev) => {
        const newSlots = { ...prev };
        delete newSlots[slotKey];
        return newSlots;
      });
    }
  };

  const totalPrice = Object.keys(selectedSlots).reduce((sum, slotKey) => {
    const [day, hour] = slotKey.split("-").map(Number);
    return sum + getPrice(hour, day, selectedStudio, peopleCount);
  }, 0);

  return (
    <div className="container mx-auto py-12 flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Бронирование</h1>
      <div className="divider"></div>
      <h2 className="text-2xl">
        Студия
      </h2>
      <div className="flex flex-wrap gap-4">
        {studios.map(studio => (
          <div
            key={studio.id}
            className={`card ${studio.color} text-white shadow-lg cursor-pointer ${selectedStudio === studio.id ? 'ring ring-primary' : ''}`}
            onClick={() => setSelectedStudio(studio.id)}
          >
            <div className="card-body">
              <h2 className="card-title text-base-content">{studio.name}</h2>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl">
        Количество человек
      </h2>
      <div className="flex flex-wrap gap-4 items-center">
        {[...Array(10).keys()].map(n => (
          <button
            key={n + 1}
            className={`btn btn-square ${peopleCount === n + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPeopleCount(n + 1)}
          >
            {n + 1}
          </button>
        ))}
      </div>

      <div className="divider"></div>

      <div className="">
        <button
          className="btn"
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
        >
          Предыдущая неделя
        </button>
        <button
          className="btn ml-4"
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
        >
          Следующая неделя
        </button>
      </div>

      <div className="overflow-x-auto">
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
          {Array.from({length: 24}).map((_, hour) => (
            <tr key={hour}>
              <td>{`${hour}:00`}</td>
              {weekDates.map((date, dayIndex) => {
                const isUnavailable = !(date.getDay() % 7); // Example unavailable logic
                const price = getPrice(
                  hour,
                  dayIndex,
                  selectedStudio,
                  peopleCount,
                );
                const slotKey = `${dayIndex}-${hour}`;
                const isSelected = selectedSlots[slotKey];

                return (
                  <td
                    key={dayIndex}
                    className={`${isUnavailable ? "bg-gray-300" : "cursor-pointer hover:bg-primary-content"} ${isSelected ? "bg-primary text-primary-content hover:bg-base-content" : ""}`}
                    onClick={() =>
                      !isUnavailable && handleSlotClick(dayIndex, hour)
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

      <div className="mt-8 flex items-center justify-end">
        <div className="mr-4">
          <h2 className="text-xl">Итоговая стоимость: ${totalPrice}</h2>
        </div>
        <button className="btn btn-primary">Бронировать</button>
      </div>
    </div>
  );
}
