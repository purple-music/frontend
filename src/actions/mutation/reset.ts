"use server";

import { z } from "zod";

import { generatePasswordResetToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ActionResult } from "@/lib/types";
import { authError, authSuccess } from "@/lib/utils/actions";
import { ResetSchema } from "@/schemas/schemas";

export async function resetPassword(
  data: z.infer<typeof ResetSchema>,
): Promise<ActionResult> {
  const validatedFields = ResetSchema.safeParse(data);

  if (!validatedFields.success) {
    return authError("Invalid fields!");
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return authError("Email not found!");
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return authSuccess("Reset email sent!");
}
