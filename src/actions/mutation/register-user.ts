"use server";

import prisma from "@/lib/db";
import { RegisterErrors, RegisterSchema, UserSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/actions/query/user";

export async function registerUser(
  prevState: RegisterErrors,
  data: FormData,
): Promise<RegisterErrors> {
  const validatedFields = RegisterSchema.safeParse({
    email: data.get("email"),
    name: data.get("name"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user.",
    };
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      message: "A user with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, name, password: hashedPassword } });

  // TODO: send verification token later

  revalidatePath("/auth/login");
  redirect("/auth/login");
}
