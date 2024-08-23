"use server";

import prisma from "@/lib/db";
import { dateToHour } from "@/lib/utils/time";
import { Booking } from "@prisma/client";

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

  return prisma.booking.findMany({
    where: {
      order: {
        userId: userId,
      },
      hour: {
        gte: currentHour, // Only get bookings that are after the current hour
      },
    },
    include: {
      order: true, // Include order if you need it
    },
  });
}
