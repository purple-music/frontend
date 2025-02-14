"use server";

export async function getVerificationTokenByEmail(email: string) {
  // try {
  //   return await prisma.verificationToken.findUnique({
  //     where: { email },
  //   });
  // } catch {
  //   return null;
  // }
  // TODO: prisma removed
  return null;
}

export async function getVerificationTokenByToken(token: string) {
  // try {
  //   const verificationToken = await prisma.verificationToken.findUnique({
  //     where: { token },
  //   });
  //   return verificationToken;
  // } catch {
  //   return null;
  // }
  // TODO: prisma removed
  return null;
}
