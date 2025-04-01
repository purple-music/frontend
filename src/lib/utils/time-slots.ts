import { format } from "date-fns";

import { FreeSlot } from "@/api/queries/free-slots/free-slots";
import { TimeSlot } from "@/api/queries/time-slots/time-slots";

export type TimeSlotsGroupedByStudio = {
  [studioId: string]: TimeSlot[];
};

export type TimeSlotsGroupedByDayAndStudio = {
  [date: string]: TimeSlotsGroupedByStudio;
};

export type TimeSlotsGroupedByDay = {
  [day: string]: TimeSlot[];
};

export type FreeSlotsGroupedByStudio = {
  [studioId: string]: FreeSlot[];
};

const groupTimeSlotsByDayAndStudio = (
  timeSlots: TimeSlot[],
): TimeSlotsGroupedByDayAndStudio => {
  const grouped: TimeSlotsGroupedByDayAndStudio = {};

  for (const slot of timeSlots) {
    // Extract the date (YYYY-MM-DD) from startTime
    const date = format(slot.startTime, "yyyy-MM-dd");

    if (!date) {
      continue;
    }

    // Initialize the date group if it doesn't exist
    if (!grouped[date]) {
      grouped[date] = {};
    }

    // Initialize the studio group if it doesn't exist
    if (!grouped[date][slot.studioId]) {
      grouped[date][slot.studioId] = [];
    }

    // Add the time slot to the appropriate group
    grouped[date][slot.studioId]!.push(slot);
  }

  return grouped;
};

const groupTimeSlotsByDay = (timeSlots: TimeSlot[]): TimeSlotsGroupedByDay => {
  const grouped: TimeSlotsGroupedByDay = {};

  for (const slot of timeSlots) {
    // Extract the date (YYYY-MM-DD) from startTime
    const date = new Date(slot.startTime).toISOString().split("T")[0];

    if (!date) {
      continue;
    }

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(slot);
  }

  return grouped;
};

const groupFreeSlotsByStudio = (
  freeSlots: FreeSlot[],
): FreeSlotsGroupedByStudio => {
  const grouped: FreeSlotsGroupedByStudio = {};

  for (const slot of freeSlots) {
    if (!grouped[slot.studioId]) {
      grouped[slot.studioId] = [];
    }

    grouped[slot.studioId]!.push(slot);
  }

  return grouped;
};

export {
  groupTimeSlotsByDayAndStudio,
  groupTimeSlotsByDay,
  groupFreeSlotsByStudio,
};
