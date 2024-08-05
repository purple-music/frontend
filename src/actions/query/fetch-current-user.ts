"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function fetchCurrentUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
