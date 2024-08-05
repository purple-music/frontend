"use server";

import prisma from "@/lib/db";
import { User, Booking } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { hourToDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import {
  RegisterUserErrors,
  LoginUserErrors,
  RegisterUser,
  UserSchema,
} from "@/schemas/schemas";

export async function registerUser(
  prevState: RegisterUserErrors,
  data: FormData,
): Promise<RegisterUserErrors> {
  const validatedFields = RegisterUser.safeParse({
    email: data.get("email"),
    name: data.get("name"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user.",
    };
  }

  const { email, name, password } = validatedFields.data;

  const userCount = await prisma.user.count({
    where: {
      email,
    },
  });
  if (userCount > 0) {
    return {
      message: "A user with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, name, hashedPassword } });

  revalidatePath("/login");
  redirect("/login");
}

export async function authenticate(
  state: LoginUserErrors,
  formData: FormData,
): Promise<LoginUserErrors> {
  try {
    const value = await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials. " + error.message,
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
  redirect("/lk");
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

  revalidatePath("/lk/view/desktop");
  redirect("/lk/view/desktop");
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
