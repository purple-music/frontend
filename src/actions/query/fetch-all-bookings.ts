"use server";

import prisma from "@/lib/db";
import { Booking } from "@prisma/client";

export async function fetchAllBookings(): Promise<Booking[]> {
  return prisma.booking.findMany();
}
