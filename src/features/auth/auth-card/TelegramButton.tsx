import { LoginButton } from "@telegram-auth/react";

export const TelegramButton = ({ backendUrl }: { backendUrl: string }) => {
  if (!backendUrl) {
    throw new Error("BACKEND_URL is not defined");
  }

  return (
    <LoginButton
      botUsername="PurpleStudioBot"
      authCallbackUrl={`${backendUrl}/auth/callback/telegram`}
      buttonSize="medium"
      cornerRadius={8}
      showAvatar={true}
    />
  );
};
