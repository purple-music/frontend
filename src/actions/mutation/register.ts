"use server";

import prisma from "@/lib/db";
import { RegisterSchema } from "@/schemas/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/actions/query/user";
import { generateVerificationToken } from "@/actions/mutation/tokens";
import { ActionResult } from "@/lib/types";
import { sendVerificationEmail } from "@/lib/mail";
import { z } from "zod";
import { authError, authSuccess } from "@/lib/utils/actions";

export async function registerUser(
  data: z.infer<typeof RegisterSchema>,
): Promise<ActionResult> {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return authError("Invalid fields!");
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return authError("A user with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, name, password: hashedPassword } });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return authSuccess("Email sent!");
}
