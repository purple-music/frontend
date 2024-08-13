"use server";

import { generateVerificationToken } from "@/actions/mutation/tokens";
import { getUserByEmail } from "@/actions/query/user";
import { signIn } from "@/auth";
import { Success } from "@/lib/types";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginErrors, LoginSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authCredentials(
  state: LoginErrors,
  data: FormData,
): Promise<LoginErrors & Success> {
  const validatedFields = LoginSchema.safeParse({
    email: data.get("email"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      // No message because we create object on the server and it can't fail
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { generalError: "No such user!" };
  if (!existingUser.email) return { generalError: "No email found!" };
  if (!existingUser.password)
    return { generalError: "Use another provider to login!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Email sent!" };
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
      AccessDenied: "Access Denied!",
      AdapterError: "Database is unreachable!",
    };

    if (error instanceof AuthError) {
      const message = authErrorMessages[error.type] || "Something went wrong.";
      return { generalError: message };
    }

    throw error;
  }
  redirect("/lk");
}

export async function authYandex() {
  await signIn("yandex", {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
}
