"use server";

import { z } from "zod";

import { Booking } from "@/api/queries/bookings/bookings";
import { BookingSlotInfo } from "@/features/my/booking/BookingStudioTimeSelect/BookingStudioTimeSelect";
import { PersonalBooking } from "@/features/my/dashboard/PersonalBookings/PersonalBookings";
import { StudioId } from "@/lib/types";
import { Result, error, success } from "@/lib/utils/result";
import { GetAvailableSlotsSchema } from "@/schemas/schemas";

// TODO: this is usually made with "start" and "end" query params
export async function getTransformedBookingsByUserId(
  userId: string,
): Promise<Record<string, PersonalBooking[]>> {
  const currentDate = new Date();

  // const bookings = await prisma.booking.findMany({
  //   where: {
  //     order: {
  //       userId: userId,
  //     },
  //     slotTime: {
  //       gte: currentDate,
  //     },
  //   },
  // });
  // TODO: prisma removed

  // return transformBookings(bookings);
  return {};
}

function transformBookings(
  bookings: Booking[],
): Record<string, PersonalBooking[]> {
  const result: Record<string, PersonalBooking[]> = {};

  bookings.forEach((booking) => {
    const day = new Date(booking.slotTime).toISOString().split("T")[0]; // Group by day

    if (!day) {
      return;
    }

    if (!result[day]) {
      result[day] = [];
    }

    result[day].push({
      studio: booking.studioId as StudioId,
      time: new Date(booking.slotTime),
      people: booking.peopleCount,
      status: getStatus(booking),
      cost: calculateCost(booking),
    });
  });

  return result;
}

function getStatus(booking: Booking): "unpaid" | "paid" | "cancelled" {
  return "paid"; // Example placeholder
}

function calculateCost(booking: Booking): number {
  return 100; // Example placeholder
}

export async function getCurrentBookingsByUserId(
  userId: string,
): Promise<Booking[]> {
  const currentDate = new Date();

  // return prisma.booking.findMany({
  //   where: {
  //     order: {
  //       userId: userId,
  //     },
  //     slotTime: {
  //       gte: currentDate,
  //     },
  //   },
  // });

  // TODO: prisma removed

  return [];
}

const getPrice = (studioId: StudioId | string) => {
  switch (studioId) {
    case "blue":
      return 600;
    case "orange":
      return 500;
    case "purple":
      return 500;
    default:
      return 400;
  }
};

// Returning available slots instead of booked is more flexible for the UI and computation of the price is on the backend
export async function getAvailableSlots(
  data: z.infer<typeof GetAvailableSlotsSchema>,
): Promise<Result<BookingSlotInfo[], string>> {
  const validatedFields = GetAvailableSlotsSchema.safeParse(data);

  if (!validatedFields.success) {
    return error(validatedFields.error.message);
  }

  const { from, to } = validatedFields.data;
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (fromDate >= toDate) {
    return error("From date must be before to date");
  }

  try {
    // Fetch studios and their bookings
    // const studiosWithBookings = await prisma.studio.findMany({
    //   include: {
    //     bookings: true,
    //   },
    // });
    // TODO: prisma removed

    // const availableSlots: BookingSlotInfo[] = [];
    //
    // for (const studio of studiosWithBookings) {
    //   const bookedSlots = studio.bookings
    //     .filter(
    //       (booking) =>
    //         booking.slotTime >= fromDate && booking.slotTime <= toDate,
    //     )
    //     .map((booking) => ({
    //       slotTime: booking.slotTime.getTime(),
    //     }));
    //
    //   // Generate hourly slots in a given range
    //   for (
    //     let hour = fromDate.getTime();
    //     hour <= toDate.getTime();
    //     hour += 60 * 60 * 1000
    //   ) {
    //     const slotTime = new Date(hour);
    //
    //     if (!bookedSlots.some((slot) => slot.slotTime === slotTime.getTime())) {
    //       availableSlots.push({
    //         studioId: studio.id as StudioId,
    //         slotTime,
    //         price: getPrice(studio.id),
    //       });
    //     }
    //   }
    // }

    // // And make slots that are after NOW() unavailable
    // const now = new Date();
    // return success(availableSlots.filter((slot) => slot.slotTime > now));
    return error("TODO: prisma removed");
  } catch (err) {
    console.error("Error fetching available slots:", err);
    return error("Error fetching available slots");
  }
}
