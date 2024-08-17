"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { makeOrder } from "@/actions/mutation/make-order";
import PeopleCountSelector from "@/app/lk/booking/_components/people-count-selector";
import SlotSelector from "@/app/lk/booking/_components/slot-selector";
import StudioSelector from "@/app/lk/booking/_components/studio-selector";
import { MakeOrderSchema } from "@/schemas/schemas";
import { StudioId } from "@/lib/types";

type Hour = number;

interface StudioInfo {
  name: string;
  id: StudioId;
  color: string;
}

const studios: StudioInfo[] = [
  { name: "Blue Studio", id: "blue", color: "bg-blue-300" },
  { name: "Orange Studio", id: "orange", color: "bg-orange-300" },
  { name: "Purple Studio", id: "purple", color: "bg-purple-300" },
];

const getPrice = (hour: number, peopleCount: number) => {
  const basePrice = 50;
  const hourlyRate = hour >= 8 && hour < 18 ? 100 : 75;
  return basePrice + hourlyRate * peopleCount;
};

export function Booking() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof MakeOrderSchema>>({
    defaultValues: {
      studio: studios[0].id,
      peopleCount: 1,
      slots: [],
    },
    resolver: zodResolver(MakeOrderSchema),
  });

  const selectedSlots = watch("slots");
  const peopleCount = watch("peopleCount");

  const onSubmit = async (data: z.infer<typeof MakeOrderSchema>) => {
    await makeOrder(data);
    // TODO: do something with the result;
  };

  const handleSlotClick = (hour: Hour) => {
    const currentSlots = watch("slots");
    if (currentSlots.includes(hour)) {
      setValue(
        "slots",
        currentSlots.filter((h) => h !== hour),
      );
    } else {
      setValue("slots", [...currentSlots, hour]);
    }
  };

  const totalPrice = selectedSlots.reduce(
    (sum, hour) => sum + getPrice(Number(hour), peopleCount),
    0,
  );

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="studio"
        control={control}
        render={({ field }) => (
          <StudioSelector
            studios={studios}
            selectedStudio={field.value}
            onStudioSelect={field.onChange}
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="peopleCount"
        control={control}
        render={({ field }) => (
          <PeopleCountSelector
            peopleCount={field.value}
            onPeopleCountSelect={field.onChange}
            disabled={isSubmitting}
          />
        )}
      />

      <SlotSelector
        selectedStudio={watch("studio")}
        peopleCount={peopleCount}
        selectedSlots={selectedSlots}
        handleSlotClick={handleSlotClick}
        getPrice={getPrice}
        disabled={isSubmitting}
      />

      {errors.slots && <p className="text-red-500">{errors.slots.message}</p>}

      <div className="flex items-center justify-end">
        <div className="mr-4">
          <h2 className="text-xl">Итоговая стоимость: ${totalPrice}</h2>
        </div>
        <button
          className={`btn btn-primary ${isSubmitting && "btn-disabled"}`}
          type="submit"
          disabled={isSubmitting}
        >
          Бронировать
        </button>
      </div>
    </form>
  );
}
