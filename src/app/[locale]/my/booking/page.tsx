"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { type Booking } from "@prisma/client";

import { makeOrder } from "@/actions/mutation/make-order";
import Button from "@/components/atoms/Button/Button";
import PeopleInput from "@/components/atoms/PeopleInput/PeopleInput";
import Typography from "@/components/atoms/Typography/Typography";
import BookingCalendar from "@/components/molecules/BookingCalendar/BookingCalendar";
import BookingStudioTimeSelect, {
  SelectedTimeSlot,
} from "@/components/organisms/BookingStudioTimeSelect/BookingStudioTimeSelect";
import { MakeOrderSchema } from "@/schemas/schemas";

const InputHeading = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="headline" size="small">
        {label}
      </Typography>
      {children}
    </div>
  );
};

interface BookingSlotInputProps {
  selectedTimeSlots: SelectedTimeSlot[];
  setSelectedTimeSlots: (timeSlots: SelectedTimeSlot[]) => void;
}

const BookingSlotInput = ({
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
      slots: [],
      peopleCount: 1,
    },
    resolver: zodResolver(MakeOrderSchema),
  });
  const t = useTranslations("my");

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
              selectedTimeSlots={value}
              setSelectedTimeSlots={onChange}
            />
          </InputHeading>
        )}
      />

      {/* Submit Button that shows an alert for debugging */}
      <Button
        label={t("booking.form.submit")}
        type="submit"
        className="btn btn-primary"
        onClick={() => makeOrder(watch())}
      ></Button>
    </>
  );
};

export default Page;
