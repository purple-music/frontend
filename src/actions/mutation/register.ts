"use server";

import prisma from "@/lib/db";
import { RegisterSchema } from "@/schemas/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/actions/query/user";
import { generateVerificationToken } from "@/actions/mutation/tokens";
import { ActionResult } from "@/lib/types";
import { sendVerificationEmail } from "@/lib/mail";
import { z } from "zod";

export async function registerUser(
  data: z.infer<typeof RegisterSchema>,
): Promise<ActionResult> {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { type: "error", message: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { type: "error", message: "A user with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, name, password: hashedPassword } });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { type: "success", message: "Email sent!" };
}
