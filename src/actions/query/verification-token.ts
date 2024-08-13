"use server";

import prisma from "@/lib/db";

export async function getVerificationTokenByEmail(email: string) {
  try {
    return await prisma.verificationToken.findFirst({
      where: { email },
    });
  } catch {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
}
