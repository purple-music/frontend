import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const host = process.env.AUTH_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${host}/auth/new-verification?token=${token}`;

  console.log("Sending verification email to", email);

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });

    console.log("Email sent", result);
  } catch (error) {
    console.log("Error sending email", error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const confirmLink = `${host}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset password.</p>`,
  });
}
