"use server";

import { signIn } from "@/auth";
import { LoginErrors, LoginSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  state: LoginErrors,
  data: FormData,
): Promise<LoginErrors> {
  const validatedFields = LoginSchema.safeParse({
    email: data.get("email"),
    password: data.get("password"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user.",
    };
  }

  try {
    const value = await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials. " + error.message,
          };
        case "CallbackRouteError":
          return {
            message: "Unable to log in. " + error.message,
          };
        default:
          return {
            message: "Something went wrong. " + error.message,
          };
      }
    }
    throw error;
  }
  redirect("/lk");
}
