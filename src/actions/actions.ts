"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Hour } from "@/lib/types";
import { hourToDate } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function registerUser(data: FormData) {
  const email = data.get("email") as string;
  if (!email) throw new Error("Email is required");

  return prisma.user.create({
    data: { email },
  });
}

export async function loginUser(data: FormData) {
  const email = data.get("email") as string;
  if (!email) throw new Error("Email is required");

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

export async function addBooking(data: FormData) {
  const userId = data.get("userId") as string;
  const studio = data.get("studio") as string;
  console.log(userId, studio, typeof data.get("slots"));
  const slots = JSON.parse(data.get("slots") as string) as Hour[];
  const peopleCount = Number(data.get("peopleCount"));

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

  revalidatePath("/");
  redirect("/view/desktop");
}
