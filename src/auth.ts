import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { LoginErrors } from "@/schemas/schemas";
import { AuthMessageError } from "@/lib/utils";

async function getUser(email: string): Promise<User | null> {
  try {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const invalidCredentials = () => {
          console.log("Invalid credentials");
          return null;
        };

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return invalidCredentials();

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return invalidCredentials();

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        return passwordsMatch ? user : invalidCredentials();
      },
    }),
  ],
});
