import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
} from "react-aria-components";

import { Booking } from "../../../app/[locale]/my/booking/_components/Booking";

const BookingCalendar = () => {
  return (
    <Calendar aria-label="Appointment date">
      <header className="flex items-center h-6">
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>
        {(date) => <CalendarCell date={date} className={"h-12 w-12"} />}
      </CalendarGrid>
    </Calendar>
  );
};

export default BookingCalendar;
