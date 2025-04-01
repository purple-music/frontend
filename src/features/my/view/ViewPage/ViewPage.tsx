import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { useTimeSlotsQuery } from "@/api/queries/time-slots/time-slots";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import MultiSelectButtonGroup from "@/components/ui/MultiSelectButtonGroup/MultiSelectButtonGroup";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";
import { ValidationErrorToast } from "@/components/ui/toasts/ValidationErrorToast";
import Timetable from "@/features/my/view/Timetable/Timetable";
import { ValidationError } from "@/lib/axios";
import { StudioId } from "@/lib/types";
import { getAllStudios, getStudioLabel } from "@/lib/utils/studios";
import { stripTime } from "@/lib/utils/time";
import {
  TimeSlotsGroupedByDayAndStudio,
  groupTimeSlotsByDayAndStudio,
} from "@/lib/utils/time-slots";

interface ViewPageProps {}

type ButtonGroupButtons<T> = { label: string; value: T }[];

const ViewPage = ({}: ViewPageProps) => {
  const today = new Date();
  const [selectedStudios, setSelectedStudios] =
    useState<StudioId[]>(getAllStudios());
  const [days, setDays] = useState<number>(7);

  const { data, isLoading, isError, error, isSuccess } = useTimeSlotsQuery({
    startDate: stripTime(today),
    endDate: stripTime(addDays(today, days)),
    studioIds: selectedStudios,
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

  // TODO: scale differently based not on date range,
  // TODO: but do something like "small, normal, wide"
  // TODO: with fixed column width and horizontal overflow scroll
  // TODO: Wait, I don't think that's a great idea...
  const dateRangeButtons: ButtonGroupButtons<number> = [
    { label: "day", value: 1 },
    { label: "3 days", value: 3 },
    { label: "week", value: 7 },
    { label: "month", value: 30 },
  ];

  if (!data) {
    return (
      <div className="flex w-full flex-row justify-center">
        <p>No data</p>
      </div>
    );
  }

  // TODO: add loading skeleton
  const timeSlotsGroupedByDay: TimeSlotsGroupedByDayAndStudio =
    groupTimeSlotsByDayAndStudio(data.timeSlots);

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
          timeSlotsGroupedByDay={timeSlotsGroupedByDay}
        ></Timetable>
      )}
    </>
  );
};

export default ViewPage;
