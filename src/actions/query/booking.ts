"use server";

import { z } from "zod";

import { Booking } from "@prisma/client";

import { BookingSlotInfo } from "@/components/organisms/BookingStudioTimeSelect/BookingStudioTimeSelect";
import prisma from "@/lib/db";
import { StudioId } from "@/lib/types";
import { Result, error, success } from "@/lib/utils/result";
import { dateToHour } from "@/lib/utils/time";
import { GetAvailableSlotsSchema } from "@/schemas/schemas";

export async function getAllBookings(): Promise<Booking[]> {
  return prisma.booking.findMany();
}

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
  });
}

export async function getCurrentBookingsByUserId(
  userId: string,
): Promise<Booking[]> {
  // Get current time in your "hour" format
  const currentHour = dateToHour(new Date());

  //   return prisma.booking.findMany({
  //     where: {
  //       order: {
  //         userId: userId,
  //       },
  //       hour: {
  //         gte: currentHour, // Only get bookings that are after the current hour
  //       },
  //     },
  //     include: {
  //       order: true, // Include order if you need it
  //     },
  //   });

  return Promise.resolve([]);
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
    const studiosWithBookings = await prisma.studio.findMany({
      include: {
        bookings: true,
      },
    });

    const availableSlots: BookingSlotInfo[] = [];

    for (const studio of studiosWithBookings) {
      const bookedSlots = studio.bookings
        .filter(
          (booking) =>
            booking.slotTime >= fromDate && booking.slotTime <= toDate,
        )
        .map((booking) => ({
          slotTime: booking.slotTime.getTime(),
        }));

      // Generate hourly slots in a given range
      for (
        let hour = fromDate.getTime();
        hour <= toDate.getTime();
        hour += 60 * 60 * 1000
      ) {
        const slotTime = new Date(hour);

        if (!bookedSlots.some((slot) => slot.slotTime === slotTime.getTime())) {
          availableSlots.push({
            studioId: studio.id as StudioId,
            slotTime,
            price: getPrice(studio.id),
          });
        }
      }
    }

    return success(availableSlots);
  } catch (err) {
    console.error("Error fetching available slots:", err);
    return error("Error fetching available slots");
  }
}
