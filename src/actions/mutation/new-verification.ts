"use server";

import { getUserByEmail } from "@/actions/query/user";
import { getVerificationTokenByToken } from "@/actions/query/verification-token";
import prisma from "@/lib/db";
import { ActionResult } from "@/lib/types";

export async function newVerification(token: string): Promise<ActionResult> {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken)
    return { type: "error", message: "Token does not exist!" };

  const hadExpired = new Date(exisitingToken.expires) < new Date();
  if (hadExpired) return { type: "error", message: "Token has expired!" };

  const existingUser = await getUserByEmail(exisitingToken.email);
  if (!existingUser) return { type: "error", message: "Email does not exist!" };

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

  return { type: "success", message: "Email verified" };
}
