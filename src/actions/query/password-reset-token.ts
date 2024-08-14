"use server";

import prisma from "@/lib/db";

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    return await prisma.passwordResetToken.findUnique({
      where: { email },
    });
  } catch {
    return null;
  }
}

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
}
