import React from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  HeadingContext,
  HeadingProps,
  useContextProps,
} from "react-aria-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import Typography from "@/components/atoms/Typography/Typography";

const BookingCalendar = () => {
  return (
    <Calendar aria-label="Appointment date">
      <header className="flex items-center h-6 justify-between w-[21rem]">
        <Button slot="previous">
          <FaChevronLeft />
        </Button>
        <Heading />
        <Button slot="next">
          <FaChevronRight />
        </Button>
      </header>
      <CalendarGrid className="w-[21rem]">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="w-12 h-12">{day}</CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody className="[&>tr>td]:p-0">
          {(date) => (
            <CalendarCell
              date={date}
              className="w-12 h-12 flex items-center justify-center"
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  );
};

export default BookingCalendar;

