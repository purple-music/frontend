"use client";

import React, { useEffect, useState } from "react";

import { getAvailableSlots } from "@/actions/query/booking";
import Surface from "@/components/atoms/Surface/Surface";
import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";

import BookingStudioTimeSelectBody from "./BookingStudioTimeSelectBody";
import BookingStudioTimeSelectHeader from "./BookingStudioTimeSelectHeader";

export type StudioTimeSlotInfo = {
  slotTime: Date;
  price: number;
};

export type BookingSlotInfo = {
  studioId: StudioId;
  slotTime: Date;
  price: number;
};

export type SelectedTimeSlot = {
  slotTime: Date;
  studio: StudioId;
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
    slot1.slotTime.getTime() === slot2.slotTime.getTime() &&
    slot1.studio === slot2.studio
  );
};

const BookingStudioTimeSelect = ({
  day,
  workingHours,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingStudioTimeSelectProps) => {
  // TODO: fetch this from the server based on the day
  // TODO: consider using array of objects with "studioId" instead of Map
  // TODO: use Moscow timezone with Luxon
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    BookingSlotInfo[] | null
  >(null);

  useEffect(() => {
    console.log("Fetching available slots...");
    const fetchAvailableSlots = async () => {
      const slots = await getAvailableSlots({
        from: day.toISOString(),
        to: day.toISOString(),
      });
      if (slots.type === "error") return; // TODO: handle error
      setAvailableTimeSlots(slots.content);
    };

    console.log("Fetched available slots: ", availableTimeSlots);

    void fetchAvailableSlots();
  }, [availableTimeSlots, day]); // Refetch whenever the selected day changes

  // TODO: draw loading skeleton
  if (!availableTimeSlots) return <div>Loading...</div>;

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
    <Surface className="h-96 box-content w-[calc(3rem+8rem+8rem+8rem)] overflow-hidden relative">
      <Typography
        variant={"title"}
        size={"large"}
        className={"h-12 flex items-center justify-center"}
      >
        {day.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
        })}
      </Typography>
      <BookingStudioTimeSelectHeader
        day={day}
        studios={[...new Set(availableTimeSlots.map((s) => s.studioId))]}
      />
      <BookingStudioTimeSelectBody
        day={day}
        workingHours={workingHours}
        availableTimeSlots={availableTimeSlots}
        selectedTimeSlots={selectedTimeSlots}
        onSlotClick={onSlotClick}
      />
    </Surface>
  );
};

export default BookingStudioTimeSelect;
