import NextAuth, { DefaultSession, User } from "next-auth";
// Do not remove this import, otherwise it will break the typechecker
import { JWT } from "next-auth/jwt";

import { UserRole } from "@prisma/client";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "@/actions/query/user";
import authConfig from "@/auth.config";
import prisma from "@/lib/db";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      role: UserRole;
      id: NonNullable<User["id"]>;
      email: NonNullable<User["email"]>;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: UserRole;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log({
        user,
        account,
      });
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false; // FIXME: eh? Try to make id required

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // TODO: add 2FA check

      return true;
    },
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
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
