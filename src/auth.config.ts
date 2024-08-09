import { getUserByEmail } from "@/actions/query/user";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas/schemas";

export default {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     // const isLoggedIn = !!auth?.user;
  //     // const isOnDashboard = nextUrl.pathname.startsWith("/lk");
  //     // if (isOnDashboard) {
  //     //   if (isLoggedIn) return true;
  //     //   return false; // Redirect unauthenticated users to login page
  //     // } else if (isLoggedIn) {
  //     //   return Response.redirect(new URL("/lk", nextUrl));
  //     // }
  //     // return true;
  //     return true;
  //   },
  // },
  providers: [
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
