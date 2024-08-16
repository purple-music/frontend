"use client";

import { getAllBookings } from "@/actions/query/booking";
import { DayView } from "@/app/lk/view/_components/day-view";
import { TimeColumn } from "@/app/lk/view/_components/time-column";
import { Booking } from "@prisma/client";
import { startOfWeek, addDays, format } from "date-fns";
import { useState, useEffect } from "react";

export function Timeline({ days = 7 }: { days?: number }) {
  const [data, setData] = useState<Booking[] | null>(null);

  useEffect(() => {
    getAllBookings().then((response) => setData(response));
  }, []);

  if (!data) return null;

  const bookings = new Map(data.map((i) => [i.hour, i]));

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const datedDays = Array.from({ length: days }, (_, i) =>
    addDays(weekStart, i),
  );

  const cellHeight = 2;
  const startHour = 9;
  const endHour = 23;

  const getHours = (day: Date) => {
    const start = day.getTime() / (1000 * 60 * 60);
    return Array.from(
      { length: endHour - startHour },
      (_, i) => startHour + i,
    ).map((hour) => start + hour);
  };

  return (
    <div className="flex w-full flex-row">
      <TimeColumn
        cellHeight={cellHeight}
        startHour={startHour}
        endHour={endHour}
      />
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
}
