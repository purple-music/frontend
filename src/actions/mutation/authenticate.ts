"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginErrors, LoginSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  state: LoginErrors,
  data: FormData,
): Promise<LoginErrors> {
  console.log("Server action.");
  const validatedFields = LoginSchema.safeParse({
    email: data.get("email"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    // console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user.",
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
    if (error instanceof AuthError) {
      console.log("AuthError!!!");
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials.",
          };
        case "CallbackRouteError":
          return {
            message: "Unable to log in.",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
  redirect("/lk");
}
