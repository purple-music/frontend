"use server";

import prisma from "@/lib/db";
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
