import React, { useEffect } from "react";
import { toast } from "sonner";

import { ProfileResponse } from "@/api/queries/auth/profile";
import { useTimeSlotsQuery } from "@/api/queries/time-slots/time-slots";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";
import { ValidationErrorToast } from "@/components/ui/toasts/ValidationErrorToast";
import { EmptyBookings } from "@/features/my/dashboard/DashboardPage/EmptyBookings";
import TimeSlotCardsGroupedByDay from "@/features/my/dashboard/PersonalBookings/TimeSlotCardsGroupedByDay";
import { ValidationError } from "@/lib/axios";
import { stripTime } from "@/lib/utils/time";
import { groupTimeSlotsByDay } from "@/lib/utils/time-slots";

interface DashboardPageProps {
  user: ProfileResponse;
}

const DashboardPage = ({ user }: DashboardPageProps) => {
  const { data, isLoading, isError, error } = useTimeSlotsQuery({
    userId: user.id,
    startDate: new Date().toISOString().split("T")[0],
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

  if (isLoading) return <div>Loading...</div>;

  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) return <div>No data</div>;

  const timeSlots = data.timeSlots;

  if (timeSlots.length === 0) {
    return <EmptyBookings />;
  }

  const timeSlotsGroupedByDay = groupTimeSlotsByDay(timeSlots);

  return (
    <>
      <ButtonGroup
        buttons={[
          { label: "Предстоящие", value: "current" },
          { label: "Прошедшие", value: "past" },
        ]}
        defaultValue={"current"}
      />
      {/*  Iterate over the days from today to the end date */}
      {Object.entries(timeSlotsGroupedByDay).map(([day, slots]) => {
        const dayKey = stripTime(day);

        if (slots.length === 0) {
          return null;
        }

        return (
          <TimeSlotCardsGroupedByDay
            timeSlots={slots}
            date={new Date(day)}
            key={dayKey}
          />
        );
      })}
    </>
  );
};

export default DashboardPage;
