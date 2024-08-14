"use server";

import { generatePasswordResetToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { Success } from "@/lib/types";
import { ResetErrors, ResetSchema } from "@/schemas/schemas";

export async function resetPassword(
  state: ResetErrors,
  data: FormData,
): Promise<ResetErrors & Success> {
  // TODO: don't check each field separately here, just return general message as "error"
  const validatedFields = ResetSchema.safeParse({
    email: data.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      // No message because we create object on the server and it can't fail
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { generalError: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
}
