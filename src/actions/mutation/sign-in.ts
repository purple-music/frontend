"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginErrors, LoginSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authCredentials(
  state: LoginErrors,
  data: FormData,
): Promise<LoginErrors> {
  console.log("Server action.");
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
  console.log("Server action 2.");

  try {
    console.log("Signing in...");
    const value = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log("Success!");
  } catch (error) {
    console.log("Error...", error);
    const authErrorMessages: Record<string, string> = {
      CredentialsSignin: "Invalid credentials.",
      CallbackRouteError: "Unable to log in.",
      AccessDenied: "Access Denied!",
      AdapterError: "Database is unreachable!",
    };

    if (error instanceof AuthError) {
      const message = authErrorMessages[error.type] || "Something went wrong.";
      return { message };
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
