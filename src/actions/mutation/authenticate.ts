"use server";

import { signIn } from "@/auth";
import { ActionErrors } from "@/lib/types";
import { UserSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const LoginUser = UserSchema.pick({ email: true, password: true });
export type LoginUserErrors = ActionErrors<typeof LoginUser>;

export async function authenticate(
  state: LoginUserErrors,
  formData: FormData,
): Promise<LoginUserErrors> {
  try {
    const value = await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials. " + error.message,
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
