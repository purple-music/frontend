import { addDays, format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Booking } from "@prisma/client";

import {
  getAllBookings,
  getCurrentBookingsByUserId,
} from "@/actions/query/booking";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import PersonalBookings, {
  PersonalBooking,
} from "@/features/my/dashboard/PersonalBookings/PersonalBookings";
import { StudioId } from "@/lib/types";

function transformSlotsToPersonalBookings(
  slots: Booking[],
  startDate: Date,
  endDate: Date,
): Record<string, PersonalBooking[]> {
  // Initialize the result object
  const personalBookings: Record<string, PersonalBooking[]> = {};

  // Populate calendar with empty arrays for each day in the range
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dayKey = format(currentDate, "yyyy-MM-dd");
    personalBookings[dayKey] = [];
    currentDate = addDays(currentDate, 1);
  }

  // Transform slots to personal bookings
  slots.forEach((slot) => {
    const dayKey = format(slot.slotTime, "yyyy-MM-dd");

    const personalBooking: PersonalBooking = {
      studio: slot.studioId as StudioId,
      time: slot.slotTime,
      // Placeholder values
      people: slot.peopleCount,
      status: "paid",
      cost: Math.floor(Math.random() * 100) + 50, // TODO: use proper values
    };

    // If the day doesn't exist in the result object, create an empty array
    if (!personalBookings[dayKey]) {
      personalBookings[dayKey] = [];
    }
    personalBookings[dayKey].push(personalBooking);
  });

  return personalBookings;
}

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.id) return;
      const bookings = await getCurrentBookingsByUserId(session?.user?.id);

      setBookings(bookings);
    };
    void fetchBookings();
  }, [session]);

  const today = new Date();
  const endDate = addDays(today, 7);

  const personalBookings = transformSlotsToPersonalBookings(
    bookings,
    today,
    endDate,
  );

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
      {Array.from(
        { length: endDate.getDate() - today.getDate() + 1 },
        (_, i) => {
          const date = addDays(today, i);
          const dayKey = format(date, "yyyy-MM-dd");
          const pBookings = personalBookings[dayKey] || [];

          if (pBookings.length === 0) return null;

          return (
            <PersonalBookings bookings={pBookings} date={date} key={dayKey} />
          );
        },
      )}
    </>
  );
};

export default DashboardPage;
