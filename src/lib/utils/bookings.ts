import { format } from "date-fns";

// TODO: prisma removed
type Booking = {
  id: number;
  slotTime: Date;
  peopleCount: number;
  createdAt: Date;
  updatedAt: Date;
  studioId: string;
  orderId: number;
};

type GroupedBookings = {
  [date: string]: Booking[]; // Key is the date in yyyy-MM-dd format, value is array of bookings for that day
};

// TODO: timezone
export const groupBookingsByDay = (bookings: Booking[]): GroupedBookings => {
  return bookings.reduce((grouped: GroupedBookings, booking: Booking) => {
    const bookingDate = booking.slotTime; // Convert hour to Date
    const day = format(bookingDate, "yyyy-MM-dd"); // Format the date as "yyyy-MM-dd" (without time)

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day].push(booking); // Group bookings by the formatted day

    return grouped;
  }, {});
};
