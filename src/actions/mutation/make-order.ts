"use server";

import prisma from "@/lib/db";
import { hourToDate } from "@/lib/utils/time";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const MakeOrder = z.object({
  userId: z.string().cuid(),
  studio: z.string(),
  slots: z
    .string()
    .transform((s, ctx) => {
      try {
        return JSON.parse(s) as number[];
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid slots JSON",
        });
        return z.never;
      }
    })
    .pipe(z.number().array().min(1, "At least one slot must be selected")),
  peopleCount: z.coerce.number().int().positive().min(1).max(10),
});

export async function makeOrder(data: FormData) {
  const { userId, studio, slots, peopleCount } = MakeOrder.parse({
    userId: data.get("userId"),
    studio: data.get("studio"),
    slots: data.get("slots"),
    peopleCount: data.get("peopleCount"),
  });

  const bookings = slots.map((hour) => {
    const date = hourToDate(hour);
    return {
      title: `Booking for ${studio} at ${date.getHours()}:00 on ${date.getDay()}`,
      hour,
      studio,
    };
  });

  const order = await prisma.order.create({
    data: {
      payload: JSON.stringify({ studio, slots, peopleCount }),
      user: { connect: { id: userId } },
      bookings: { create: bookings },
    },
  });

  revalidatePath("/lk/view/desktop");
  redirect("/lk/view/desktop");
}
