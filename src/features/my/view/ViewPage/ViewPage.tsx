import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";

import { Booking } from "@prisma/client";

import { getAllBookings } from "@/actions/query/booking";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import MultiSelectButtonGroup from "@/components/ui/MultiSelectButtonGroup/MultiSelectButtonGroup";
import Timetable from "@/features/my/view/Timetable/Timetable";
import { StudioId } from "@/lib/types";

interface ViewPageProps {}

type ButtonGroupButtons<T> = { label: string; value: T }[];

export type Day = string; // "yyyy-MM-dd"

function transformSlotsToCalendar(
  slots: Booking[],
  startDate: Date,
  endDate: Date,
): Record<Day, Record<StudioId, Date[]>> {
  // Initialize the result object
  const calendarSlots: Record<Day, Record<StudioId, Date[]>> = {};

  // Populate calendar with empty structures for each day in the range
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dayKey = format(currentDate, "yyyy-MM-dd");
    calendarSlots[dayKey] = {} as Record<StudioId, Date[]>;
    currentDate = addDays(currentDate, 1);
  }

  // Group slots by day and studio
  slots.forEach((slot) => {
    const dayKey = format(slot.slotTime, "yyyy-MM-dd");

    // If the day doesn't exist in the result object, create an empty structure
    if (!calendarSlots[dayKey]) {
      calendarSlots[dayKey] = {} as Record<StudioId, Date[]>;
    }

    // Ensure the studio exists in the day's record
    if (!calendarSlots[dayKey][slot.studioId as StudioId]) {
      calendarSlots[dayKey][slot.studioId as StudioId] = [];
    }

    // Add the slot time to the appropriate day and studio
    calendarSlots[dayKey][slot.studioId as StudioId].push(slot.slotTime);
  });

  return calendarSlots;
}

const ViewPage = ({}: ViewPageProps) => {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [selectedStudios, setSelectedStudios] = useState<StudioId[]>([
    "blue",
    "orange",
    "purple",
  ]);
  const [days, setDays] = useState<number>(7);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getAllBookings();

      setAllBookings(bookings);
    };
    void fetchBookings();
  }, []);

  const today = new Date();
  const studioButtons: ButtonGroupButtons<StudioId> = [
    { label: "Purple", value: "purple" },
    { label: "Orange", value: "orange" },
    { label: "Blue", value: "blue" },
  ];
  // TODO: scale differently based not on date range, but do something like "small, normal, wide" with fixed column width and horizontal overflow scroll
  const dateRangeButtons: ButtonGroupButtons<number> = [
    { label: "day", value: 1 },
    { label: "3 days", value: 3 },
    { label: "week", value: 7 },
    { label: "month", value: 30 },
  ];

  const busySlots = transformSlotsToCalendar(
    allBookings,
    today,
    addDays(today, days),
  );

  return (
    <>
      <div className="flex w-full flex-row flex-wrap justify-between gap-4">
        <MultiSelectButtonGroup
          buttons={studioButtons}
          onClick={(values) => setSelectedStudios(values as StudioId[])}
        />
        <ButtonGroup
          buttons={dateRangeButtons}
          onClick={(value) => setDays(value)}
        />
      </div>
      <Timetable
        startDate={today}
        endDate={addDays(today, days)}
        timezone="en-US"
        studios={selectedStudios}
        busySlots={busySlots}
      ></Timetable>
    </>
  );
};

export default ViewPage;
