"use server";

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    // return await prisma.passwordResetToken.findUnique({
    //   where: { email },
    // });
    // TODO: prisma removed
    return null;
  } catch {
    return null;
  }
}

export async function getPasswordResetTokenByToken(token: string) {
  try {
    // const passwordResetToken = await prisma.passwordResetToken.findUnique({
    //   where: { token },
    // });
    // return passwordResetToken;
    // TODO: prisma removed
    return null;
  } catch {
    return null;
  }
}
