"use server";

import { z } from "zod";

import { Order } from "@prisma/client";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Result, error, success } from "@/lib/utils/result";
import { dateToHour, hourToDate } from "@/lib/utils/time";
import { MakeOrderSchema } from "@/schemas/schemas";

export async function makeOrder(
  data: z.infer<typeof MakeOrderSchema>,
): Promise<Result<Order, string>> {
  const validatedFields = MakeOrderSchema.safeParse(data);

  if (!validatedFields.success) {
    return error("Invalid input!");
  }

  const session = await auth();

  if (!session) {
    return error("No session specified!");
  }

  const { studio, slots, peopleCount } = validatedFields.data;

  // Check if any of the slots for the selected studio are already booked
  const existingBookings = await prisma.booking.findMany({
    where: {
      studio,
      hour: { in: slots }, // Check if any of the requested slots are already booked
    },
  });

  // If there are existing bookings for any of the requested slots, return an error
  if (existingBookings.length > 0) {
    return error("Some slots are already booked.");
  }

  const now = dateToHour(new Date());
  if (slots.some((hour) => now >= hour)) {
    return error("Could not book in the past.");
  }

  const bookings = slots.map((hour) => {
    return {
      hour,
      studio,
    };
  });

  const order = await prisma.order.create({
    data: {
      user: { connect: { id: session.user.id } },
      bookings: { create: bookings },
    },
  });

  return success(order);
}
