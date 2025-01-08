import { clsx } from "clsx";
import React from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarProps,
  DateValue,
  HeadingContext,
  HeadingProps,
  useContextProps,
} from "react-aria-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import Surface from "@/components/layout/Surface/Surface";
import { getButtonClasses } from "@/components/ui/ButtonBase/ButtonBase";
import { getTypographyStyles } from "@/components/ui/Typography/Typography";

const BookingCalendarHeading = React.forwardRef(
  (props: HeadingProps, ref: React.ForwardedRef<HTMLHeadingElement>) => {
    // Merge the local props and ref with the ones provided via context.
    [props, ref] = useContextProps(props, ref, HeadingContext);

    const { className, style } = getTypographyStyles("title", "large");

    return <h2 {...props} ref={ref} className={className} style={style} />;
  },
);
BookingCalendarHeading.displayName = "BookingCalendarHeading";

interface BookingCalendarProps<T extends DateValue> extends CalendarProps<T> {}

const BookingCalendar = <T extends DateValue>({
  ...props
}: BookingCalendarProps<T>) => {
  const buttonClasses = getButtonClasses({
    variant: "filled",
    width: "squared",
    size: "sm",
    disabled: false,
    startIcon: true,
  });

  return (
    <Surface>
      <Calendar
        aria-label="Appointment date"
        className={"w-[21rem]"}
        {...props}
      >
        <header className="flex h-12 w-[21rem] items-center justify-between">
          <div className="flex w-12 items-center justify-center">
            <Button slot="previous" className={buttonClasses}>
              <FaChevronLeft />
            </Button>
          </div>
          <BookingCalendarHeading />
          <div className="flex w-12 items-center justify-center">
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
                <CalendarHeaderCell className="h-12 w-12">
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
                  className={({ isSelected }) => {
                    return clsx(
                      "h-12 w-12",
                      "rounded-full",
                      "flex items-center justify-center",
                      isSelected
                        ? "bg-secondary-container text-on-secondary-container"
                        : "",
                    );
                  }}
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
