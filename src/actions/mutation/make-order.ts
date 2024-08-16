"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { error, Result, success } from "@/lib/utils/result";
import { MakeOrderSchema } from "@/schemas/schemas";
import { Order } from "@prisma/client";
import { z } from "zod";

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
