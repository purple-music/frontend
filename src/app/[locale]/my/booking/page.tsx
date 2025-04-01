"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { useMakeBookingMutation } from "@/api/mutations/bookings/make-booking";
import Button from "@/components/ui/Button/Button";
import Typography from "@/components/ui/Typography/Typography";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";
import { SuccessToast } from "@/components/ui/toasts/SuccessToast";
import { ValidationErrorToast } from "@/components/ui/toasts/ValidationErrorToast";
import BookingCalendar from "@/features/my/booking/BookingCalendar/BookingCalendar";
import BookingStudioTimeSelect, {
  SelectedTimeSlot,
} from "@/features/my/booking/BookingStudioTimeSelect/BookingStudioTimeSelect";
import PeopleInput from "@/features/my/booking/PeopleInput/PeopleInput";
import { MakeBooking } from "@/schemas/schemas";

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
  const mutation = useMakeBookingMutation();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof MakeBooking>>({
    defaultValues: {
      slots: [],
      peopleCount: 1,
    },
    resolver: zodResolver(MakeBooking),
  });
  const { t } = useTranslation("my");

  useEffect(() => {
    // handle submit
    if (mutation.isSuccess) {
      const data = mutation.data;

      toast.custom(() => (
        <SuccessToast>
          <span>{t("booking.post-action.success")}</span>
        </SuccessToast>
      ));

      reset({
        slots: [],
        peopleCount: 1,
      });
    }
    if (mutation.isError) {
      const error = mutation.error.data;

      if (error.statusCode === 400) {
        toast.custom((tst) => <ValidationErrorToast error={error} />);
        return;
      }

      if (error.statusCode === 401) {
        toast.custom((tst) => (
          <ErrorToast>
            <span>{error.message}</span>
          </ErrorToast>
        ));
        return;
      }
    }
  }, [
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    t,
    reset,
  ]);

  const onSubmit = (data: z.infer<typeof MakeBooking>) => {
    mutation.mutate({
      slots: data.slots.map(
        (slot) =>
          ({
            studio: slot.studio,
            startTime: slot.startTime,
            endTime: slot.endTime,
            peopleCount: data.peopleCount,
          }) as const,
      ),
    });
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
