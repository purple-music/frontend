import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/actions/query/user";

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
        const user = await getUserByEmail(email);
        if (!user) return invalidCredentials();
        if (!user.password) return invalidCredentials(); // FIXME: In case of not credentials

        const passwordsMatch = await bcrypt.compare(password, user.password);
        return passwordsMatch ? user : invalidCredentials();
      },
    }),
  ],
});
