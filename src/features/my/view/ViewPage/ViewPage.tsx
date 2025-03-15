import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  TimeSlot,
  useTimeSlotsQuery,
} from "@/api/queries/time-slots/time-slots";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import MultiSelectButtonGroup from "@/components/ui/MultiSelectButtonGroup/MultiSelectButtonGroup";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";
import { ValidationErrorToast } from "@/components/ui/toasts/ValidationErrorToast";
import Timetable from "@/features/my/view/Timetable/Timetable";
import { ValidationError } from "@/lib/axios";
import { StudioId } from "@/lib/types";
import { getAllStudios, getStudioLabel } from "@/lib/utils/studios";

interface ViewPageProps {}

type ButtonGroupButtons<T> = { label: string; value: T }[];

export type Day = string; // "yyyy-MM-dd"

const dayOnly = (date: Date): Day => format(date, "yyyy-MM-dd");

function transformSlotsToCalendar(
  slots: TimeSlot[],
  startDate: Date,
  endDate: Date,
): Record<Day, Record<StudioId, Date[]>> {
  // Initialize the result object
  const calendarSlots: Record<Day, Record<StudioId, Date[]>> = {};

  // Populate calendar with empty structures for each day in the range
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dayKey = dayOnly(currentDate);
    calendarSlots[dayKey] = {} as Record<StudioId, Date[]>;
    currentDate = addDays(currentDate, 1);
  }

  // Group slots by day and studio
  slots.forEach((slot) => {
    const dayKey = dayOnly(new Date(slot.startTime));

    // If the day doesn't exist in the result object, create an empty structure
    if (!calendarSlots[dayKey]) {
      calendarSlots[dayKey] = {} as Record<StudioId, Date[]>;
    }

    // Ensure the studio exists in the day's record
    if (!calendarSlots[dayKey][slot.studioId as StudioId]) {
      calendarSlots[dayKey][slot.studioId as StudioId] = [];
    }

    // Add the slot time to the appropriate day and studio
    calendarSlots[dayKey][slot.studioId as StudioId].push(
      new Date(slot.startTime),
    );
  });

  return calendarSlots;
}

const ViewPage = ({}: ViewPageProps) => {
  const today = new Date();
  const [selectedStudios, setSelectedStudios] =
    useState<StudioId[]>(getAllStudios());
  const [days, setDays] = useState<number>(7);

  const { data, isLoading, isError, error, isSuccess } = useTimeSlotsQuery({
    startDate: dayOnly(today),
    endDate: dayOnly(addDays(today, days)),
  });

  useEffect(() => {
    if (isError && error) {
      if (error.data.statusCode === 400) {
        const e: ValidationError = error.data;
        toast.custom((tst) => (
          <ValidationErrorToast error={e}></ValidationErrorToast>
        ));
      } else if (error.data.statusCode === 401) {
        toast.custom((tst) => (
          <ErrorToast>
            <span>{error.data.message}</span>
          </ErrorToast>
        ));
      } else {
        toast.custom((tst) => (
          <ErrorToast>
            <span>{error.data.message}</span>
          </ErrorToast>
        ));
      }
    }
  }, [isError, error]);

  // TODO: scale differently based not on date range, but do something like "small, normal, wide" with fixed column width and horizontal overflow scroll
  const dateRangeButtons: ButtonGroupButtons<number> = [
    { label: "day", value: 1 },
    { label: "3 days", value: 3 },
    { label: "week", value: 7 },
    { label: "month", value: 30 },
  ];

  // TODO: add loading skeleton
  const busySlots = transformSlotsToCalendar(
    data?.timeSlots || [],
    today,
    addDays(today, days),
  );

  return (
    <>
      <div className="flex w-full flex-row flex-wrap justify-between gap-4">
        <MultiSelectButtonGroup
          buttons={getAllStudios().map((studio) => ({
            label: getStudioLabel(studio),
            value: studio,
          }))}
          defaultValues={selectedStudios}
          onClick={(values) => setSelectedStudios(values as StudioId[])}
        />
        <ButtonGroup
          buttons={dateRangeButtons}
          defaultValue={days}
          onClick={(value) => setDays(value)}
        />
      </div>
      {isLoading ? (
        // TODO: add loading skeleton
        <div>Loading...</div>
      ) : (
        <Timetable
          startDate={today}
          endDate={addDays(today, days)}
          timezone="en-US"
          studios={selectedStudios}
          busySlots={busySlots}
        ></Timetable>
      )}
    </>
  );
};

export default ViewPage;
