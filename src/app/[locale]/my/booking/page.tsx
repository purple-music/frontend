"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { type Booking } from "@prisma/client";

import { makeOrder } from "@/actions/mutation/make-order";
import Button from "@/components/ui/Button/Button";
import Typography from "@/components/ui/Typography/Typography";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";
import { SuccessToast } from "@/components/ui/toasts/SuccessToast";
import BookingCalendar from "@/features/my/booking/BookingCalendar/BookingCalendar";
import BookingStudioTimeSelect, {
  SelectedTimeSlot,
} from "@/features/my/booking/BookingStudioTimeSelect/BookingStudioTimeSelect";
import PeopleInput from "@/features/my/booking/PeopleInput/PeopleInput";
import { MakeOrderSchema } from "@/schemas/schemas";

const InputHeading = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
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
    <div className="flex flex-row flex-wrap gap-4">
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
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof MakeOrderSchema>>({
    defaultValues: {
      slots: [],
      peopleCount: 1,
    },
    resolver: zodResolver(MakeOrderSchema),
  });
  const { t } = useTranslation("my");

  const refreshBookings = () => reset({ slots: [], peopleCount: 1 });

  const onSubmit = async (data: z.infer<typeof MakeOrderSchema>) => {
    const result = await makeOrder(data);
    // TODO: add button "Go to my bookings"
    if (result.type === "success") {
      toast.custom(() => (
        <SuccessToast>
          <span>{t("booking.post-action.success")}</span>
        </SuccessToast>
      ));
      refreshBookings();
    } else {
      toast.custom((tst) => (
        <ErrorToast>
          <span>Error: {result.error}</span>
          <button onClick={() => refreshBookings()} className="btn btn-block">
            {t("booking.post-action.refresh")}
          </button>
        </ErrorToast>
      ));
    }
  };

  return (
    <>
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
        onClick={handleSubmit(onSubmit)}
      ></Button>
    </>
  );
};

export default Page;
