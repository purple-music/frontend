"use client";

import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, add } from "date-fns";
import { fetchCurrentUser, addBooking } from "@/actions/actions";
import { Hour } from "@/lib/types";
import { dateToHour } from "@/lib/utils";

const studios = [
  { name: "Blue Studio", id: "blue", color: "bg-blue-300" },
  { name: "Orange Studio", id: "orange", color: "bg-orange-300" },
  { name: "Purple Studio", id: "purple", color: "bg-purple-300" },
];

const getWeekDates = (startDate: Date) => {
  return Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
};

const getPrice = (hour: number, peopleCount: number) => {
  const basePrice = 50;
  const hourlyRate = hour >= 8 && hour < 18 ? 100 : 75;
  return basePrice + hourlyRate * peopleCount;
};

function DesktopTable({
  selectedStudio,
  peopleCount,
  selectedSlots,
  handleSlotClick,
}: {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: number[];
  handleSlotClick: (hour: number) => void;
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
        <button className="btn" onClick={(e) => handleWeekClick(e, -7)}>
          Предыдущая неделя
        </button>
        <button className="btn ml-4" onClick={(e) => handleWeekClick(e, 7)}>
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
                      onClick={() => !isUnavailable && handleSlotClick(slotKey)}
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

function MobileTable({
  selectedStudio,
  peopleCount,
  selectedSlots,
  handleSlotClick,
}: {
  selectedStudio: string;
  peopleCount: number;
  selectedSlots: number[];
  handleSlotClick: (hour: number) => void;
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
        <button className="btn" onClick={(e) => handleDayClick(e, -1)}>
          Предыдущий день
        </button>
        <button className="btn ml-4" onClick={(e) => handleDayClick(e, 1)}>
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
                    onClick={() => !isUnavailable && handleSlotClick(slotKey)}
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

export default function Page() {
  const [selectedStudio, setSelectedStudio] = useState(studios[0].id);
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState<Hour[]>([]);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user") || "";
    fetchCurrentUser(userId).then(setUser);
  }, []);

  useEffect(() => {
    console.log(selectedSlots);
  }, [selectedSlots]);

  const handleSlotClick = (hour: Hour) => {
    console.log("lol", hour);
    if (selectedSlots.indexOf(hour) === -1) {
      setSelectedSlots((prev) => [...prev, hour]);
    } else {
      setSelectedSlots((prev) => prev.filter((h) => h !== hour));
    }
  };

  const totalPrice = Object.keys(selectedSlots).reduce(
    (sum, hour) => sum + getPrice(Number(hour), peopleCount),
    0,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    formData.append("userId", user.id);
    formData.append("studio", selectedStudio);
    formData.append("slots", JSON.stringify(selectedSlots));
    formData.append("peopleCount", peopleCount.toString());

    await addBooking(formData);
  };

  return (
    <div className="mx-auto flex flex-col gap-6 py-12">
      <h1 className="text-4xl font-bold">Бронирование</h1>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="mb-4 text-2xl">Студия</legend>
          <div className="flex flex-wrap gap-4">
            {studios.map((studio) => (
              <label
                key={studio.id}
                className={`card ${studio.color} cursor-pointer text-white shadow-lg ${selectedStudio === studio.id ? "ring ring-primary" : ""}`}
              >
                <div className="card-body">
                  <h2 className="card-title text-base-content">
                    {studio.name}
                  </h2>
                </div>
                <input
                  type="radio"
                  name="selected_studio"
                  onClick={() => setSelectedStudio(studio.id)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 text-2xl">Количество человек</legend>
          <div className="flex flex-wrap items-center gap-4">
            {[...Array(10).keys()].map((n) => (
              <label
                key={n + 1}
                className={`btn btn-square ${peopleCount === n + 1 ? "btn-primary" : "btn-outline"}`}
              >
                {n + 1}
                <input
                  type="radio"
                  name="people_count"
                  onClick={() => setPeopleCount(n + 1)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="sr-only">Выбор слотов</legend>
          <div className="flex flex-col gap-4 md:hidden">
            <MobileTable
              selectedStudio={selectedStudio}
              peopleCount={peopleCount}
              selectedSlots={selectedSlots}
              handleSlotClick={handleSlotClick}
            />
          </div>
          <div className="hidden flex-col gap-4 md:flex">
            <DesktopTable
              selectedStudio={selectedStudio}
              peopleCount={peopleCount}
              selectedSlots={selectedSlots}
              handleSlotClick={handleSlotClick}
            />
          </div>
        </fieldset>

        <div className="flex items-center justify-end">
          <div className="mr-4">
            <h2 className="text-xl">Итоговая стоимость: ${totalPrice}</h2>
          </div>
          <button className="btn btn-primary" type="submit">
            Бронировать
          </button>
        </div>
      </form>
    </div>
  );
}
