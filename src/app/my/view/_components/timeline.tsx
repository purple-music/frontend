"use client";

import { getAllBookings } from "@/actions/query/booking";
import { DayView } from "@/app/my/view/_components/day-view";
import { Table } from "@/components/table/table";
import { TableContent } from "@/components/table/table-content";
import { TableContentColumn } from "@/components/table/table-content-column";
import { TablePrefix } from "@/components/table/table-prefix";
import { TableTimeColumn } from "@/components/table/table-time-column";
import { StudioId } from "@/lib/types";
import { dateToHour, hourToDate } from "@/lib/utils/time";
import { Booking } from "@prisma/client";
import { addDays, format, startOfDay, add } from "date-fns";
import { useState, useEffect } from "react";

export function TimelineContent({
  days,
  studios,
  bookings: data,
}: {
  days: number;
  studios: StudioId[];
  bookings: Booking[];
}) {
  const bookings = new Map(data.map((i) => [i.hour, i]));
  const start = startOfDay(new Date());
  const end = startOfDay(add(start, { days })); // Exclusive

  const datedDays = Array.from({ length: days }, (_, i) => addDays(start, i));

  const defaultStart = 9;
  const defaultEnd = 23;

  const getStartHour = () => {
    // Find the earliest booking hour across all days within the range
    const earliestHour = datedDays.reduce((minHour, day) => {
      const dayStart = dateToHour(startOfDay(day));
      const dayEnd = dateToHour(startOfDay(addDays(day, 1)));
      const hoursInDay = Array.from(bookings.keys()).filter(
        (hour) => hour >= dayStart && hour < dayEnd,
      ); // Bookings for the day

      if (hoursInDay.length === 0) return minHour;
      return Math.min(minHour, hourToDate(Math.min(...hoursInDay)).getHours());
    }, Infinity);

    return Math.min(
      earliestHour === Infinity ? defaultStart : earliestHour,
      defaultStart,
    );
  };

  const getEndHour = () => {
    // Find the latest booking hour across all days within the range
    const latestHour = datedDays.reduce((maxHour, day) => {
      const dayStart = dateToHour(startOfDay(day));
      const dayEnd = dateToHour(startOfDay(addDays(day, 1)));
      const hoursInDay = Array.from(bookings.keys()).filter(
        (hour) => hour >= dayStart && hour < dayEnd,
      );

      if (hoursInDay.length === 0) return maxHour;
      return Math.max(
        maxHour,
        hourToDate(Math.max(...hoursInDay)).getHours() + 1,
      ); // % 24 to get hour within the day
    }, -Infinity);

    return Math.max(
      latestHour === -Infinity ? defaultEnd : latestHour,
      defaultEnd,
    );
  };

  const startHour = getStartHour();
  const endHour = getEndHour();

  const cellHeight = 2;

  const getHours = (day: Date) => {
    const start = dateToHour(startOfDay(day));
    return Array.from(
      { length: endHour - startHour },
      (_, i) => startHour + i,
    ).map((hour) => start + hour);
  };

  const getShort = (studio: StudioId) => {
    switch (studio) {
      case "blue":
        return "B";
      case "purple":
        return "P";
      case "orange":
        return "O";
    }
  };

  const getSoftColor = (studio: StudioId) =>
    ({
      blue: "bg-blue-300",
      purple: "bg-purple-300",
      orange: "bg-orange-300",
    })[studio];

  return (
    <Table>
      <TablePrefix headerHeight={4}>
        <TableTimeColumn
          cellHeight={cellHeight}
          startHour={startHour}
          endHour={endHour}
        />
      </TablePrefix>
      <TableContent>
        {datedDays.map((day, index) => (
          <TableContentColumn
            key={index}
            headerHeight={4}
            header={
              <>
                <div
                  className="border-b-2 border-gray-300 text-center"
                  style={{ height: `${cellHeight}rem` }}
                >
                  {format(day, "dd")}
                </div>
                <div className="flex flex-row">
                  {studios.map((studio) => (
                    <div className="flex-1" key={studio}>
                      <div
                        className={`flex w-full items-center justify-center ${getSoftColor(studio)}`}
                        style={{ height: `${cellHeight}rem` }}
                      >
                        {getShort(studio)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            }
          >
            <DayView
              hours={getHours(day)}
              cellHeight={cellHeight}
              bookings={bookings}
              studios={studios}
            />
          </TableContentColumn>
        ))}
      </TableContent>
    </Table>
  );
}

export function TimelineWrapper({
  days,
  studios,
}: {
  days: number;
  studios: StudioId[];
}) {
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    getAllBookings().then((response) => setBookings(response));
  }, []);

  if (!bookings) return <span>Timeline Skeleton</span>;

  return <TimelineContent bookings={bookings} days={days} studios={studios} />;
}
