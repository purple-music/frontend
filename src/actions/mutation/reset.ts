"use server";

import { generatePasswordResetToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ActionResult } from "@/lib/types";
import { ResetSchema } from "@/schemas/schemas";
import { z } from "zod";

export async function resetPassword(
  data: z.infer<typeof ResetSchema>,
): Promise<ActionResult> {
  const validatedFields = ResetSchema.safeParse(data);

  if (!validatedFields.success) {
    return { type: "error", message: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { type: "error", message: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { type: "success", message: "Reset email sent!" };
}
