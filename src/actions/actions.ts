"use server";

import prisma from "@/lib/db";
import { User, Booking } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { hourToDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().max(255).nullable(),
});

const RegisterUser = UserSchema.omit({ id: true }); // TODO: add password
const LoginUser = UserSchema.pick({ email: true }); // TODO: add password

export async function registerUser(data: FormData) {
  const { email, name } = RegisterUser.parse({
    email: data.get("email"),
    name: data.get("name"),
  }); // TODO: catch ZodError?

  return prisma.user.create({ data: { email, name } });
}

export async function loginUser(data: FormData) {
  const { email } = LoginUser.parse({ email: data.get("email") }); // TODO: catch ZodError?

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  return user;
}

export async function fetchCurrentUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

const BookingSchema = z.object({
  title: z.string().max(255),
  hour: z.number().int().positive(),
  studio: z.string(),
  createdAt: z.date(),
  orderId: z.string().cuid(),
});

const OrderSchema = z.object({
  id: z.string().cuid(),
  payload: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  bookings: BookingSchema.array(),
  userId: z.string().cuid(),
  user: UserSchema,
});

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

  revalidatePath("/view/desktop");
  redirect("/view/desktop");
}

export async function fetchAllBookings(): Promise<Booking[]> {
  return prisma.booking.findMany();
}

export async function fetchMyBookings(userId: string): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
  });
}
