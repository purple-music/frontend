import { format } from "date-fns";

// TODO: prisma removed
type TimeSlot = {
  id: number;
  slotTime: Date;
  peopleCount: number;
  createdAt: Date;
  updatedAt: Date;
  studioId: string;
  bookingId: number;
};

type GroupedTimeSlots = {
  [date: string]: TimeSlot[]; // Key is the date in yyyy-MM-dd format, value is array of bookings for that day
};

// TODO: timezone
export const groupBookingsByDay = (bookings: TimeSlot[]): GroupedTimeSlots => {
  return bookings.reduce((grouped: GroupedTimeSlots, booking: TimeSlot) => {
    const bookingDate = booking.slotTime; // Convert hour to Date
    const day = format(bookingDate, "yyyy-MM-dd"); // Format the date as "yyyy-MM-dd" (without time)

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day].push(booking); // Group bookings by the formatted day

    return grouped;
  }, {});
};
