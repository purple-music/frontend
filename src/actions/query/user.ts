"use server";

import { User } from "@prisma/client";

import prisma from "@/lib/db";

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}
