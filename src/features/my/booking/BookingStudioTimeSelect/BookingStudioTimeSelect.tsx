"use client";

import { addDays, startOfDay } from "date-fns";
import React, { useEffect } from "react";
import { toast } from "sonner";

import { useFreeSlotsQuery } from "@/api/queries/free-slots/free-slots";
import Surface from "@/components/layout/Surface/Surface";
import Typography from "@/components/ui/Typography/Typography";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";
import { ValidationErrorToast } from "@/components/ui/toasts/ValidationErrorToast";
import { ValidationError } from "@/lib/axios";
import { groupFreeSlotsByStudio } from "@/lib/utils/time-slots";

import BookingStudioTimeSelectBody from "./BookingStudioTimeSelectBody";
import BookingStudioTimeSelectHeader from "./BookingStudioTimeSelectHeader";

export type SelectedTimeSlot = {
  startTime: string;
  endTime: string;
  studio: string;
};

interface BookingStudioTimeSelectProps {
  day: Date;
  workingHours: [number, number];
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

export const isSlotSame = (
  slot1: SelectedTimeSlot,
  slot2: SelectedTimeSlot,
) => {
  return (
    new Date(slot1.startTime).getTime() ===
      new Date(slot2.startTime).getTime() && slot1.studio === slot2.studio
  );
};

const BookingStudioTimeSelect = ({
  day,
  workingHours,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectProps) => {
  // TODO: use Moscow timezone with Luxon
  const { data, isLoading, isError, error } = useFreeSlotsQuery({
    from: startOfDay(day).toISOString(),
    to: startOfDay(addDays(day, 1)).toISOString(),
  });

  useEffect(() => {
    if (isError && error) {
      if (error.data.statusCode === 400) {
        const e: ValidationError = error.data;
        toast.custom(() => (
          <ValidationErrorToast error={e}></ValidationErrorToast>
        ));
      } else if (error.data.statusCode === 401) {
        toast.custom(() => (
          <ErrorToast>
            <span>{error.data.message}</span>
          </ErrorToast>
        ));
      } else {
        toast.custom(() => (
          <ErrorToast>
            <span>{error.data.message}</span>
          </ErrorToast>
        ));
      }
    }
  }, [isError, error]);

  // TODO: draw loading skeleton
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error?.message}</span>;
  if (!data) return <span>No data</span>;

  const onSlotClick = (slot: SelectedTimeSlot) => {
    if (selectedTimeSlots.some((s) => isSlotSame(s, slot))) {
      setSelectedTimeSlots(
        selectedTimeSlots.filter((s) => !isSlotSame(s, slot)),
      );
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slot]);
    }
  };
  return (
    <Surface className="relative box-content h-96 max-w-[calc(3rem+8rem+8rem+8rem)] flex-grow overflow-hidden">
      <Typography
        variant={"title"}
        size={"large"}
        className={"flex h-12 items-center justify-center"}
      >
        {day.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
        })}
      </Typography>
      <BookingStudioTimeSelectHeader
        day={day}
        studios={data.freeSlots.map((s) => s.studioId)}
      />
      <BookingStudioTimeSelectBody
        day={day}
        workingHours={workingHours}
        freeSlotsGroupedByStudio={groupFreeSlotsByStudio(data.freeSlots)}
        selectedTimeSlots={selectedTimeSlots}
        onSlotClick={onSlotClick}
      />
    </Surface>
  );
};

export default BookingStudioTimeSelect;
