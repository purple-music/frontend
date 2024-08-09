import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { getUserById } from "@/actions/query/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      role: UserRole;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: UserRole;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  callbacks: {
    async jwt({ token, user, profile }) {
      if (!token.sub) return token; // Logged out

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
        // session.user.role = token.role;
      }
      return session;
    },
    // async signIn({ user }) {
    //   if (!user.id) return false;

    //   const existingUser = await getUserById(user.id);
    //   if (!existingUser || !existingUser.emailVerified) return false;

    //   return true;
    // },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
