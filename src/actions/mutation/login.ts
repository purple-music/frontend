"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { generateVerificationToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { ActionResult } from "@/lib/types";
import { authError, authSuccess } from "@/lib/utils/actions";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/schemas";

export async function authCredentials(
  data: z.infer<typeof LoginSchema>,
): Promise<ActionResult> {
  const validatedFields = LoginSchema.safeParse(data);
  if (!validatedFields.success) return authError("Invalid fields!");

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return authError("No such user!");
  if (!existingUser.email) return authError("No email found!");
  if (!existingUser.password)
    return authError("Use another provider to login!");

  // TODO: wrap prisma calls into authError
  // TODO: rewrite authError as Result.error
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    // TODO: prisma removed
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token,
    // );

    return authSuccess("Email sent!");
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
      return authError(message);
    }

    throw error;
  }
  return authSuccess("Successfully loggined!");
}

export async function authYandex() {
  await signIn("yandex", {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
}
