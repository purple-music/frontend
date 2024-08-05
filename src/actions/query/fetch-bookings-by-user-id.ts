"use server";

import prisma from "@/lib/db";
import { Booking } from "@prisma/client";

export async function fetchMyBookings(userId: string): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
  });
}
