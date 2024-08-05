"use server";

import prisma from "@/lib/db";
import { RegisterErrors, RegisterSchema, UserSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

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
      message:
        "Missing Fields. Failed to Create user." +
        validatedFields.error.flatten().fieldErrors,
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
