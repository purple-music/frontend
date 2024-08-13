"use server";

import prisma from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function generateVerificationToken(email: string) {
  const expires = new Date(Date.now() + 3600 * 1000); // one hour from now

  try {
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
  } catch (error) {
    console.error("Error creating or updating verification token:", error);
    throw new Error("Could not generate verification token");
  }
}
