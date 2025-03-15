"use server";

import { z } from "zod";

import { auth } from "@/auth";
import { Result, error, success } from "@/lib/utils/result";
import { MakeBooking } from "@/schemas/schemas";

export async function makeBooking(
  data: z.infer<typeof MakeBooking>,
): Promise<Result<any /* Order */, string>> {
  const validatedFields = MakeBooking.safeParse(data);

  if (!validatedFields.success) {
    return error("Invalid input!");
  }

  const session = await auth();

  if (!session) {
    return error("No session specified!");
  }

  const { slots, peopleCount } = validatedFields.data;

  // Extract slot times and studio IDs
  const slotTimes = slots.map((slot) => slot.startTime);
  const studioIds = slots.map((slot) => slot.studio);

  // Check for overlapping bookings
  // const overlappingBookings = await prisma.booking.findMany({
  //   where: {
  //     studioId: { in: studioIds },
  //     slotTime: { in: slotTimes },
  //   },
  // });
  //
  // if (overlappingBookings.length > 0) {
  //   return error("Some of the selected slots are already booked.");
  // }

  // Create a new order
  try {
    // const newOrder = await prisma.order.create({
    //   data: {
    //     userId: session.user.id,
    //     bookings: {
    //       create: slots.map((slot) => ({
    //         slotTime: slot.slotTime,
    //         studio: { connect: { id: slot.studio } },
    //         peopleCount,
    //       })),
    //     },
    //   },
    //   include: { bookings: true },
    // });
    //
    // return success(newOrder);

    // TODO: prisma removed
    return error("TODO: prisma removed");
  } catch (err) {
    console.error("Failed to create order:", err);
    return error("Failed to create order. Please try again later.");
  }
}
