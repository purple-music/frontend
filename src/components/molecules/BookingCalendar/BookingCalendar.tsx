import React from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  HeadingContext,
  HeadingProps,
  useContextProps,
} from "react-aria-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { getButtonClasses } from "@/components/atoms/ButtonBase/ButtonBase";
import Surface from "@/components/atoms/Surface/Surface";
import { getTypographyStyles } from "@/components/atoms/Typography/Typography";

const BookingCalendarHeading = React.forwardRef(
  (props: HeadingProps, ref: React.ForwardedRef<HTMLHeadingElement>) => {
    // Merge the local props and ref with the ones provided via context.
    [props, ref] = useContextProps(props, ref, HeadingContext);

    const { className, style } = getTypographyStyles("title", "large");

    return <h2 {...props} ref={ref} className={className} style={style} />;
  },
);
BookingCalendarHeading.displayName = "BookingCalendarHeading";

const BookingCalendar = () => {
  const buttonClasses = getButtonClasses({
    variant: "filled",
    width: "squared",
    size: "sm",
    disabled: false,
    startIcon: true,
  });

  return (
    <Surface>
      <Calendar aria-label="Appointment date" className={"w-[21rem]"}>
        <header className="flex items-center h-12 justify-between w-[21rem]">
          <div className="flex items-center justify-center w-12">
            <Button slot="previous" className={buttonClasses}>
              <FaChevronLeft />
            </Button>
          </div>
          <BookingCalendarHeading />
          <div className="flex items-center justify-center w-12">
            <Button slot="next" className={buttonClasses}>
              <FaChevronRight />
            </Button>
          </div>
        </header>
        <CalendarGrid className="w-[21rem]">
          <CalendarGridHeader>
            {(day) => {
              const { style, className } = getTypographyStyles(
                "labelBold",
                "large",
              );
              return (
                <CalendarHeaderCell className="w-12 h-12">
                  <span className={className} style={style}>
                    {day}
                  </span>
                </CalendarHeaderCell>
              );
            }}
          </CalendarGridHeader>
          <CalendarGridBody className="[&>tr>td]:p-0">
            {(date) => {
              const { className, style } = getTypographyStyles(
                "label",
                "large",
              );
              return (
                <CalendarCell
                  date={date}
                  className="w-12 h-12 flex items-center justify-center"
                >
                  <span className={className} style={style}>
                    {date.day}
                  </span>
                </CalendarCell>
              );
            }}
          </CalendarGridBody>
        </CalendarGrid>
      </Calendar>
    </Surface>
  );
};

export default BookingCalendar;
