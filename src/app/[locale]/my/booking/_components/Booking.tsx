// "use client";
//
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
//
// import { type Booking } from "@prisma/client";
//
// import { makeOrder } from "@/actions/mutation/make-order";
// import { getAllBookings } from "@/actions/query/booking";
// import PeopleCountSelector from "@/app/[locale]/my/booking/_components/PeopleCountSelector";
// import { SlotSelectorWrapper } from "@/app/[locale]/my/booking/_components/SlotSelectorWrapper";
// import StudioSelector from "@/app/[locale]/my/booking/_components/StudioSelector";
// import { getPriceRate } from "@/app/[locale]/my/booking/_data/prices";
// import { ErrorToast } from "@/components/toasts/ErrorToast";
// import { SuccessToast } from "@/components/toasts/SuccessToast";
// import { StudioId } from "@/lib/types";
// import { MakeOrderSchema } from "@/schemas/schemas";
//
// type Hour = number;
//
// interface StudioInfo {
//   name: string;
//   id: StudioId;
//   color: string;
// }
//
// const studios: StudioInfo[] = [
//   { name: "Blue Studio", id: "blue", color: "bg-blue-300" },
//   { name: "Orange Studio", id: "orange", color: "bg-orange-300" },
//   { name: "Purple Studio", id: "purple", color: "bg-purple-300" },
// ];
//
// export function Booking() {
//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<z.infer<typeof MakeOrderSchema>>({
//     defaultValues: {
//       peopleCount: 1,
//       slots: [],
//     },
//     resolver: zodResolver(MakeOrderSchema),
//   });
//   const t = useTranslations("my");
//   const router = useRouter();
//
//   const [bookings, setBookings] = useState<Booking[] | null>(null);
//
//   const refreshBookings = () => {
//     getAllBookings().then((response) => setBookings(response));
//     setValue("slots", []);
//   };
//
//   useEffect(() => {
//     // On initial load fetch bookings
//     getAllBookings().then((response) => setBookings(response));
//   }, []);
//
//   const selectedSlots = watch("slots");
//   const peopleCount = watch("peopleCount");
//
//   const onSubmit = async (data: z.infer<typeof MakeOrderSchema>) => {
//     const result = await makeOrder(data);
//     // TODO: add button "Go to my bookings"
//     if (result.type === "success") {
//       toast.custom(() => (
//         <SuccessToast>
//           <span>{t("booking.post-action.success")}</span>
//         </SuccessToast>
//       ));
//       refreshBookings();
//     } else {
//       toast.custom((tst) => (
//         <ErrorToast>
//           <span>Error: {result.error}</span>
//           <button onClick={() => refreshBookings()} className="btn btn-block">
//             {t("booking.post-action.refresh")}
//           </button>
//         </ErrorToast>
//       ));
//     }
//   };
//
//   useEffect(() => {
//     errors.slots &&
//       toast.custom(() => (
//         <ErrorToast>
//           <span>
//             {t("booking.post-action.error", { error: errors.slots?.message })}
//           </span>
//         </ErrorToast>
//       ));
//   }, [errors.slots]);
//
//   const totalPrice = selectedSlots.reduce(
//     (sum, hour) => sum + getPriceRate(Number(hour), peopleCount),
//     0,
//   );
//
//   if (bookings === null) {
//     // TODO: add skeleton
//     return <div>Loading...</div>;
//   }
//
//   return (
//     <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="studio"
//         control={control}
//         render={({ field }) => (
//           <StudioSelector
//             studios={studios}
//             selectedStudio={field.value}
//             onStudioSelect={field.onChange}
//             disabled={isSubmitting}
//           />
//         )}
//       />
//
//       <Controller
//         name="peopleCount"
//         control={control}
//         render={({ field }) => (
//           <PeopleCountSelector
//             peopleCount={field.value}
//             onPeopleCountSelect={field.onChange}
//             disabled={isSubmitting}
//           />
//         )}
//       />
//
//       <SlotSelectorWrapper
//         selectedStudio={watch("studio")}
//         peopleCount={peopleCount}
//         selectedSlots={selectedSlots}
//         onSelectedSlots={(slots) => setValue("slots", slots)}
//         disabled={isSubmitting}
//         bookings={bookings}
//         refreshBookings={refreshBookings}
//       />
//
//       <div className="flex items-center justify-end">
//         <div className="mr-4">
//           <span className="text-xl">
//             {t("booking.form.total-price", { price: totalPrice })}
//           </span>
//         </div>
//         <button
//           className={`btn btn-primary ${isSubmitting && "btn-disabled"}`}
//           type="submit"
//           disabled={isSubmitting}
//         >
//           {isSubmitting
//             ? t("booking.form.submitting")
//             : t("booking.form.submit")}
//         </button>
//       </div>
//     </form>
//   );
// }
//
