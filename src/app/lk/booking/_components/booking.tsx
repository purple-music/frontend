"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { makeOrder } from "@/actions/mutation/make-order";
import PeopleCountSelector from "@/app/lk/booking/_components/people-count-selector";
import StudioSelector from "@/app/lk/booking/_components/studio-selector";
import { MakeOrderSchema } from "@/schemas/schemas";
import { StudioId } from "@/lib/types";
import { SlotSelectorWrapper } from "@/app/lk/booking/_components/slot-selector-wrapper";
import { getPriceRate } from "@/app/lk/booking/_data/prices";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const selectedSlots = watch("slots");
  const peopleCount = watch("peopleCount");

  const onSubmit = async (data: z.infer<typeof MakeOrderSchema>) => {
    await makeOrder(data);
    router.refresh();
    // TODO: do something with the result;
  };

  const totalPrice = selectedSlots.reduce(
    (sum, hour) => sum + getPriceRate(Number(hour), peopleCount),
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

      <SlotSelectorWrapper
        selectedStudio={watch("studio")}
        peopleCount={peopleCount}
        selectedSlots={selectedSlots}
        onSelectedSlots={(slots) => setValue("slots", slots)}
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
