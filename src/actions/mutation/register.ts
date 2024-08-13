"use server";

import prisma from "@/lib/db";
import { RegisterErrors, RegisterSchema, UserSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/actions/query/user";
import { generateVerificationToken } from "@/actions/mutation/tokens";
import { Success } from "@/lib/types";
import { sendVerificationEmail } from "@/lib/mail";

export async function registerUser(
  prevState: RegisterErrors,
  data: FormData,
): Promise<RegisterErrors & Success> {
  const validatedFields = RegisterSchema.safeParse({
    email: data.get("email"),
    name: data.get("name"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      generalError: "Missing Fields. Failed to Create user.",
    };
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      generalError: "A user with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, name, password: hashedPassword } });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email sent!" };
}
