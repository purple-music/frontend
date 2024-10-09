"use server";

import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/db";

export async function generateVerificationToken(email: string) {
  const expires = new Date(Date.now() + 3600 * 1000); // one hour from now

  const verificationToken = await prisma.verificationToken.upsert({
    where: { email },
    update: {
      token: uuidv4(),
      expires,
    },
    create: {
      email,
      token: uuidv4(),
      expires,
    },
  });

  return verificationToken;
}

export async function generatePasswordResetToken(email: string) {
  const expires = new Date(Date.now() + 3600 * 1000); // one hour from now

  const passwordResetToken = await prisma.passwordResetToken.upsert({
    where: { email },
    update: {
      token: uuidv4(),
      expires,
    },
    create: {
      email,
      token: uuidv4(),
      expires,
    },
  });

  return passwordResetToken;
}
