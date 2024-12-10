"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { type Booking } from "@prisma/client";

import PeopleInput from "@/components/atoms/PeopleInput/PeopleInput";
import Typography from "@/components/atoms/Typography/Typography";
import BookingCalendar from "@/components/molecules/BookingCalendar/BookingCalendar";
import BookingStudioTimeSelect, {
  BookingSlotInfo,
  SelectedTimeSlot,
  StudioTimeSlotInfo,
} from "@/components/organisms/BookingStudioTimeSelect/BookingStudioTimeSelect";
import { StudioId } from "@/lib/types";
import { MakeOrderSchema } from "@/schemas/schemas";
import { getAvailableSlots } from "@/actions/query/booking";

const InputHeading = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="headline" size="small">
        {label}
      </Typography>
      {children}
    </div>
  );
};

interface BookingSlotInputProps {
  availableTimeSlots: BookingSlotInfo[];
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingSlotInput = ({
  availableTimeSlots,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: BookingSlotInputProps) => {
  // TODO: use Luxon
  const [selectedDay, setSelectedDay] = useState(today(getLocalTimeZone()));

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <BookingCalendar value={selectedDay} onChange={setSelectedDay} />
      <BookingStudioTimeSelect
        day={selectedDay.toDate(getLocalTimeZone())}
        workingHours={[9, 21]}
        availableTimeSlots={availableTimeSlots}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
    </div>
  );
};

const Page = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof MakeOrderSchema>>({
    defaultValues: {
      // studio: "blue",
      peopleCount: 1,
      slots: [],
    },
    resolver: zodResolver(MakeOrderSchema),
  });
  const t = useTranslations("my");

  // TODO: fetch this from the server based on the day
  // TODO: consider using array of objects with "studioId" instead of Map
  const availableTimeSlots: BookingSlotInfo = getAvailableSlots({
    from: // TODO
  })

  const [bookings, setBookings] = useState<Booking[] | null>(null);

  return (
    <>
      {/*<Controller*/}
      {/*  name="studio"*/}
      {/*  control={control}*/}
      {/*  render={({ field: { onChange, value } }) => (*/}
      {/*    <InputHeading label={t("booking.form.studio")}>*/}
      {/*      <StudioInput onChange={onChange} value={value} />*/}
      {/*    </InputHeading>*/}
      {/*  )}*/}
      {/*/>*/}

      <Controller
        name="peopleCount"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputHeading label={t("booking.form.people")}>
            <PeopleInput onChange={onChange} value={value} />
          </InputHeading>
        )}
      />
      <Controller
        name="slots"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputHeading label={t("booking.form.slots.label")}>
            <BookingSlotInput
              availableTimeSlots={availableTimeSlots}
              selectedTimeSlots={value}
              setSelectedTimeSlots={onChange}
            />
          </InputHeading>
        )}
      />

      {/* Submit Button that shows an alert for debugging */}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => alert(JSON.stringify(watch()))}
      >
        {t("booking.form.submit")}
      </button>
    </>
  );
};

export default Page;
