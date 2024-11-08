"use client";

import { add, addDays, format, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

import { Booking } from "@prisma/client";

import { getAllBookings } from "@/actions/query/booking";
import { DayView } from "@/components/organisms/Timetable/DayView";
import { Table } from "@/components/table/Table";
import { TableContent } from "@/components/table/TableContent";
import { TableContentColumn } from "@/components/table/TableContentColumn";
import { TablePrefix } from "@/components/table/TablePrefix";
import { TableTimeColumn } from "@/components/table/TableTimeColumn";
import { Hour, StudioId } from "@/lib/types";
import {
  getOneLetterStudioName,
  getSoftStudioColor,
} from "@/lib/utils/studios";
import { dateToHour, hourToDate } from "@/lib/utils/time";

/**
 * Find the earliest booking hour across all days within the range, defaulting to the default start hour if no bookings are found
 *
 * @param datedDays
 * @param bookings
 * @param defaultStart
 * @returns
 */
const getStartHour = (
  datedDays: Date[],
  bookings: Map<Hour, Booking>,
  defaultStart: number,
) => {
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

const getEndHour = (
  datedDays: Date[],
  bookings: Map<Hour, Booking>,
  defaultEnd: number,
) => {
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

export function TimetableContent({
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

  const startHour = getStartHour(datedDays, bookings, defaultStart);
  const endHour = getEndHour(datedDays, bookings, defaultEnd);

  const cellHeight = "2rem";
  const cellMinWidth = "2rem";

  const getHours = (day: Date) => {
    const start = dateToHour(startOfDay(day));
    return Array.from(
      { length: endHour - startHour },
      (_, i) => startHour + i,
    ).map((hour) => start + hour);
  };

  return (
    <Table>
      <TablePrefix headerHeight={4}>
        <TableTimeColumn
          cellHeight={cellHeight}
          cellMinWidth={cellMinWidth}
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
                  style={{ height: cellHeight, minWidth: cellMinWidth }}
                >
                  {format(day, "dd")}
                </div>
                <div className="flex flex-row">
                  {studios.map((studio) => (
                    <div className="flex-1" key={studio}>
                      <div
                        className={`flex w-full items-center justify-center ${getSoftStudioColor(studio)}`}
                        style={{ height: cellHeight }}
                      >
                        {getOneLetterStudioName(studio)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            }
          >
            <DayView
              hours={getHours(day)}
              cellMinWidth={cellMinWidth}
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

  return <TimetableContent bookings={bookings} days={days} studios={studios} />;
}

