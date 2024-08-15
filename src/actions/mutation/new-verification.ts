"use server";

import { getUserByEmail } from "@/actions/query/user";
import { getVerificationTokenByToken } from "@/actions/query/verification-token";
import prisma from "@/lib/db";
import { ActionResult } from "@/lib/types";
import { authError, authSuccess } from "@/lib/utils/actions";

export async function newVerification(token: string): Promise<ActionResult> {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return authError("Token does not exist!");

  const hadExpired = new Date(existingToken.expires) < new Date();
  if (hadExpired) return authError("Token has expired!");

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return authError("Email does not exist!");

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return authSuccess("Email verified");
}
