"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { getPasswordResetTokenByToken } from "@/actions/query/password-reset-token";
import { getUserByEmail } from "@/actions/query/user";
import { ActionResult } from "@/lib/types";
import { authError, authSuccess } from "@/lib/utils/actions";
import { NewPasswordSchema, ResetSchema } from "@/schemas/schemas";

export async function newPassword(
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
): Promise<ActionResult> {
  if (!token) return authError("Missing token!");

  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return authError("Invalid fields!");
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return authError("Invalid token!");
  }

  // TODO: prisma removed
  // const hasExpired = new Date(existingToken.expires) < new Date();
  //
  // if (hasExpired) {
  //   return authError("Token has expired!");
  // }
  //
  // const existingUser = await getUserByEmail(existingToken.email);
  //
  // if (!existingUser) {
  //   return authError("Email does not exist!");
  // }

  const hashedPassword = await bcrypt.hash(password, 10);

  // await prisma.user.update({
  //   where: { id: existingUser.id },
  //   data: { password: hashedPassword },
  // });
  //
  // await prisma.passwordResetToken.delete({
  //   where: { id: existingToken.id },
  // });
  // TODO: prisma removed

  return authSuccess("Password updated!");
}
