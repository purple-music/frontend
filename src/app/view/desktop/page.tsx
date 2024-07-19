"use client";

import React from "react";
import { addDays, differenceInHours, format, startOfWeek } from "date-fns";

type Studio = "blue" | "purple" | "orange";

const studios: Studio[] = ["purple", "orange", "blue"];

const getShort = (studio: Studio) => {
  switch (studio) {
    case "blue":
      return "B";
    case "purple":
      return "P";
    case "orange":
      return "O";
  }
};

const getColor = (studio: Studio) => {
  switch (studio) {
    case "blue":
      return "bg-blue";
    case "purple":
      return "bg-purple";
    case "orange":
      return "bg-orange";
  }
};

const hoursToPixels = (start: Date, end: Date) => {
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return diff * 10; // adjust this value to fit your design
};

type Booking = {
  id: number; // PK
  hour: number; // PK
  studio: Studio;
  text: string;
};

const BookingCell = ({
  hours,
  studio,
  bookings,
  cellHeight,
}: {
  hours: number[];
  studio: Studio;
  bookings: Map<number, Booking>;
  cellHeight: number;
}) => {
  const elements: React.ReactNode[] = [];
  for (let i = 0; i < hours.length; ) {
    if (bookings.has(hours[i]) && bookings.get(hours[i])!.studio === studio) {
      let count = 0;
      const id = bookings.get(hours[i])!.id;
      while (
        bookings.has(hours[i]) &&
        bookings.get(hours[i])!.studio === studio &&
        bookings.get(hours[i])!.id === id
      ) {
        count++;
        i++;
      }
      elements.push(
        <div
          key={hours[i - 1]}
          className="box-border border-t border-gray-500 p-0.5"
          style={{ height: `${cellHeight * count}rem` }}
        >
          <div
            className={`h-full overflow-hidden overflow-ellipsis text-nowrap rounded-md ${getColor(studio)}-500 text-center text-primary-content`}
          />
        </div>,
      );
    } else {
      elements.push(
        <div
          key={hours[i]}
          style={{ height: `${cellHeight}rem` }}
          className="box-border border-t border-gray-500"
        />,
      );
      i++;
    }
  }
  return <>{elements}</>;
};

const DayColumn = ({
  studio,
  bookings,
  cellHeight,
  hours,
}: {
  studio: Studio;
  bookings: Map<number, Booking>;
  cellHeight: number;
  hours: number[];
}) => (
  <div className="flex-1">
    <div
      className={`flex w-full items-center justify-center ${getColor(studio)}-300`}
      style={{ height: `${cellHeight}rem` }}
    >
      {getShort(studio)}
    </div>
    <div className="flex flex-col">
      <BookingCell
        hours={hours}
        studio={studio}
        bookings={bookings}
        cellHeight={cellHeight}
      />
    </div>
  </div>
);

const DayView = ({
  bookings,
  cellHeight,
  hours,
}: {
  bookings: Map<number, Booking>;
  cellHeight: number;
  hours: number[];
}) => (
  <div className="flex flex-row">
    {studios.map((studio) => (
      <DayColumn
        key={studio}
        studio={studio}
        bookings={bookings}
        cellHeight={cellHeight}
        hours={hours}
      />
    ))}
  </div>
);

const Timeline = ({ data, days = 7 }: { data: Booking[]; days?: number }) => {
  const bookings = new Map(data.map((i) => [i.hour, i]));

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const datedDays = Array.from({ length: days }, (_, i) =>
    addDays(weekStart, i),
  );

  const cellHeight = 2;
  const startHour = 9;
  const endHour = 23;

  const hours = Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i,
  );

  const getHours = (day: Date) => {
    const start = day.getTime() / (1000 * 60 * 60);
    return hours.map((hour) => start + hour);
  };

  return (
    <div className="flex w-full flex-row">
      <div>
        <div style={{ height: `${cellHeight * 2}rem` }}></div>
        <div className="flex flex-col items-end border-t border-gray-500 pr-1">
          {hours.map((hour) => (
            <div key={hour} style={{ height: `${cellHeight}rem` }}>
              {hour}:00
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-row">
        {datedDays.map((day, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col border-l border-gray-500"
          >
            <div
              className="border-b-2 border-gray-300 text-center"
              style={{ height: `${cellHeight}rem` }}
            >
              {format(day, "dd")}
            </div>
            <DayView
              hours={getHours(day)}
              cellHeight={cellHeight}
              bookings={bookings}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const data: Booking[] = [
    { id: 1, studio: "orange", text: "1", hour: 478094 },
    { id: 1, studio: "orange", text: "1", hour: 478095 },
    { id: 1, studio: "orange", text: "1", hour: 478096 },
    { id: 2, studio: "orange", text: "1", hour: 478097 },
    { id: 3, studio: "orange", text: "1", hour: 478099 },
    { id: 4, studio: "blue", text: "3", hour: 478097 },
    { id: 5, studio: "purple", text: "5", hour: 4780979 },
  ];

  return (
    <div className="container mx-auto flex flex-col gap-6 py-12">
      <h1 className="text-4xl font-bold">Просмотр</h1>
      <Timeline data={data} days={31} />
    </div>
  );
}
