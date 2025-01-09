import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getTransformedBookingsByUserId } from "@/actions/query/booking";
import ButtonGroup from "@/components/ui/ButtonGroup/ButtonGroup";
import { EmptyBookings } from "@/features/my/dashboard/DashboardPage/EmptyBookings";
import PersonalBookings, {
  PersonalBooking,
} from "@/features/my/dashboard/PersonalBookings/PersonalBookings";

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
  const [bookings, setBookings] = useState<Record<string, PersonalBooking[]>>(
    {},
  );

  const { data: session } = useSession();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.id) return;
      const bookings = await getTransformedBookingsByUserId(session?.user?.id);

      setBookings(bookings);
    };
    void fetchBookings();
  }, [session]);

  const personalBookings = Object.entries(bookings).sort(([dayA], [dayB]) => {
    const dateA = new Date(dayA);
    const dateB = new Date(dayB);
    return dateA.getTime() - dateB.getTime(); // ascending order (oldest to newest)
  });

  console.log(personalBookings, "personalBookings", personalBookings.length);

  if (personalBookings.length === 0) {
    return <EmptyBookings />;
  }

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
      {personalBookings.map(([day, bookings]) => {
        const dayKey = format(day, "yyyy-MM-dd");

        if (bookings.length === 0) {
          return null;
        }

        return (
          <PersonalBookings
            bookings={bookings}
            date={new Date(day)}
            key={dayKey}
          />
        );
      })}
    </>
  );
};

export default DashboardPage;
