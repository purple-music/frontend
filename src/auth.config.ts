import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Yandex from "next-auth/providers/yandex";

import { getUserByEmail } from "@/actions/query/user";
import { LoginSchema } from "@/schemas/schemas";

export default {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    Yandex,
    Credentials({
      async authorize(credentials) {
        console.log("Authorizing...");
        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;

        const user = await getUserByEmail(email);

        // If there's no password, it means that user authed not with credentials

        if (!user) {
          console.log("No user with email", email);
          return null;
        }

        if (!user.password) {
          console.log("No password specified for user", email);
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
