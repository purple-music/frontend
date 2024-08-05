"use server";

import prisma from "@/lib/db";
import { UserSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { ActionErrors } from "@/lib/types";

export const RegisterUser = UserSchema.omit({ id: true });
export type RegisterUserErrors = ActionErrors<typeof RegisterUser>;

export async function registerUser(
  prevState: RegisterUserErrors,
  data: FormData,
): Promise<RegisterUserErrors> {
  const validatedFields = RegisterUser.safeParse({
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

  const userCount = await prisma.user.count({
    where: {
      email,
    },
  });
  if (userCount > 0) {
    return {
      message: "A user with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, name, hashedPassword } });

  revalidatePath("/login");
  redirect("/login");
}
