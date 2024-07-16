"use client";

import React from "react";
import { addDays, differenceInHours, format, startOfWeek } from "date-fns";

type Studio = "blue" | "purple" | "orange";

const studios: Studio[] = ["blue", "purple", "orange"];

const getShort = (studio: Studio) => {
  switch (studio) {
    case "blue":
      return "BLU";
    case "purple":
      return "PUR";
    case "orange":
      return "ORA";
  }
};

const getColor = (studio: Studio) => {
  switch (studio) {
    case "blue":
      return "bg-blue-200";
    case "purple":
      return "bg-purple-200";
    case "orange":
      return "bg-orange-200";
  }
};

const hoursToPixels = (start: Date, end: Date) => {
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return diff * 10; // adjust this value to fit your design
};

// TODO: O(n^2) fix

type Booking = {
  id: number, // PK
  hour: number; // PK
  studio: "orange" | "blue" | "purple";
  text: string;
};

function Timeline({ data }: { data: Booking[] }) {
  const bookings = new Map(data.map(i => [i.hour, i]));

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getBarStyle = (startDate: Date, endDate: Date) => {
    const startHour = (startDate.getHours() + startDate.getMinutes() / 60) / 24;
    const durationHours = differenceInHours(endDate, startDate);
    const durationPercent = (durationHours / 24) * 100;
    return {
      top: `${startHour * 100}%`,
      height: `${durationPercent}%`,
    };
  };

  const cellHeight = 2;
  const startHour = 9;
  const endHour = 23;

  const hours = Array.from(
    { length: endHour - startHour },
    (x, i) => startHour + i,
  );

  const getHours = (day: Date) => {
    const start = day.getTime() / (1000 * 60 * 60);
    return hours.map(hour => start + hour);
  }

  const DayBooking = ({ hours, studio }: { hours: number[], studio: Studio }) => {
    let elements: Array<React.ReactNode> = [];

    for (let i = 0; i < hours.length;) {
      if (bookings.has(hours[i]) && (bookings.get(hours[i])!.studio === studio)) {
        let count = 0;
        const id = bookings.get(hours[i])!.id;
        while (bookings.has(hours[i]) && (bookings.get(hours[i])!.studio === studio) && bookings.get(hours[i])!.id === id) {
          count++;
          i++;
        }
        elements.push(<div key={hours[i-1]} className="box-border border-t border-gray-500 p-1" style={{height: `${cellHeight * count}rem`}}>
          <div className="bg-primary rounded-md text-primary-content h-full text-center overflow-ellipsis text-nowrap overflow-hidden">
            {id}
          </div>
        </div>)
      } else {
        elements.push(<div key={hours[i]} style={{height: `${cellHeight}rem`}} className="box-border border-t border-gray-500">
        {/*{hours[i]}*/}
        </div>)
        i++;
      }
    }

    return elements
  };

  return (
    <div className="flex flex-row w-full">
      <div>
        <div style={{height: `${cellHeight * 2}rem`}}></div>
        <div className="flex flex-col border-t border-gray-500 items-end pr-1">
          {hours.map((hour) => (
            <div key={hour} style={{height: `${cellHeight}rem`}}>{hour}:00</div>
          ))}
        </div>
      </div>
      <div className="flex flex-row flex-1">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="flex flex-1 flex-col border-l border-gray-500">
            <div className="border-b-2 border-gray-300 text-center"
                 style={{height: `${cellHeight}rem`}}>
              {format(day, "E dd")}
            </div>
            <div className="flex flex-row">
              {studios.map((studio, index) => (
                <div key={studio} className="flex-1">
                  <div
                    className={`flex items-center justify-center w-full ${getColor(studio)}`}
                    style={{height: `${cellHeight}rem`}}
                  >
                    {getShort(studio)}
                  </div>
                  <div
                    className="flex flex-col"
                  >
                    <DayBooking hours={getHours(day)} studio={studio}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const data: Booking[] = [
    {
      id: 1,
      studio: "orange",
      text: "1",
      hour: 478094, // UNIX timestamp is in hours
    },
    {
      id: 1,
      studio: "orange",
      text: "1",
      hour: 478095,
    },
    {
      id: 1,
      studio: "orange",
      text: "1",
      hour: 478096,
    },
    {
      id: 2,
      studio: "orange",
      text: "1",
      hour: 478097,
    },
    {
      id: 3,
      studio: "orange",
      text: "1",
      hour: 478099,
    },
    {
      id: 4,
      studio: "blue",
      text: "3",
      hour: 478097,
    },
    {
      id: 5,
      studio: "purple",
      text: "5",
      hour: 4780979,
    },
  ];

  return (
    <div className="container mx-auto flex flex-col gap-6 py-12">
      <h1 className="text-4xl font-bold">Просмотр</h1>
      {/*<div className="divider"></div>*/}

      <Timeline data={data}/>
    </div>
  );
}
