"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function registerUser(data: FormData) {
  const email = data.get("email") as string;
  if (!email) throw new Error("Email is required");

  const user = await prisma.user.create({
    data: { email },
  });

  return user;
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
