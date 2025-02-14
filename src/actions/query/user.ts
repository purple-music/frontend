"use server";

// import { User } from "@prisma/client";

export async function getUserById(id: string): Promise<any | null> {
  // return prisma.user.findUnique({
  //   where: {
  //     id: id,
  //   },
  // });

  // TODO: prisma removed
  return null;
}

export async function getUserByEmail(email: string): Promise<any | null> {
  // return prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });

  // TODO: prisma removed
  return null;
}
