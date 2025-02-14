"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { generateVerificationToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { getVerificationTokenByEmail } from "@/actions/query/verification-token";
import { sendVerificationEmail } from "@/lib/mail";
import { ActionResult } from "@/lib/types";
import { authError, authSuccess } from "@/lib/utils/actions";
import { RegisterSchema } from "@/schemas/schemas";

// Helper function to send verification email
async function sendVerification(email: string): Promise<void> {
  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);
  // TODO: prisma removed
}

// Helper function to hash password and create a new user
async function createUser(
  email: string,
  name: string,
  password: string,
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);
  // await prisma.user.create({
  //   data: { email, name, password: hashedPassword },
  // });
  // TODO: prisma removed
}

export async function registerUser(
  data: z.infer<typeof RegisterSchema>,
): Promise<ActionResult> {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return authError("Invalid fields!");
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    // Create new user and send verification email
    await createUser(email, name, password);
    await sendVerification(email);
    return authSuccess("Email sent!");
  }

  if (!existingUser.email) {
    return authError("No email found on existing user!"); // TODO: make audit logs
  }

  if (existingUser.emailVerified) {
    return authError("A user with this email already exists.");
  }

  // const existingToken = await getVerificationTokenByEmail(existingUser.email);
  // if (!existingToken || new Date(existingToken.expires) < new Date()) {
  //   // Delete unverified user and re-create
  //   // await prisma.user.delete({ where: { email } });
  //   // TODO: prisma removed
  //   await createUser(email, name, password);
  // }

  // Resend verification email
  await sendVerification(email);
  return authSuccess("Email sent!");
}
