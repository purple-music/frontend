"use server";

import { getUserByEmail } from "@/actions/query/user";
import { getVerificationTokenByToken } from "@/actions/query/verification-token";
import prisma from "@/lib/db";

export async function newVerification(token: string) {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) return { generalError: "Token does not exist!" };

  const hadExpired = new Date(exisitingToken.expires) < new Date();
  if (hadExpired) return { generalError: "Token has expired!" };

  const existingUser = await getUserByEmail(exisitingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: exisitingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Email verified" };
}
