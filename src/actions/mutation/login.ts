"use server";

import { generateVerificationToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { ActionResult } from "@/lib/types";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function authCredentials(
  data: z.infer<typeof LoginSchema>,
): Promise<ActionResult> {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { type: "error", message: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { type: "error", message: "No such user!" };
  if (!existingUser.email) return { type: "error", message: "No email found!" };
  if (!existingUser.password)
    return { type: "error", message: "Use another provider to login!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { type: "success", message: "Email sent!" };
  }

  try {
    const value = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    const authErrorMessages: Record<string, string> = {
      CredentialsSignin: "Invalid credentials.",
      CallbackRouteError: "Unable to log in.",
      AccessDenied: "Access Denied!", // When callback fails
      AdapterError: "Database is unreachable!",
    };

    if (error instanceof AuthError) {
      const message = authErrorMessages[error.type] || "Something went wrong.";
      return { type: "error", message: message };
    }

    throw error;
  }
  return { type: "success", message: "Successfully loggined!" };
}

export async function authYandex() {
  await signIn("yandex", {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
}
