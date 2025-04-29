import { LoginButton, TelegramAuthData } from "@telegram-auth/react";

import useLoginTelegramMutation from "@/api/mutations/auth/login-telegram";

export const TelegramButton = () => {
  const handleAuth = (data: TelegramAuthData) => {
    const initData = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      initData.append(key, value);
    });

    mutation.mutate({
      initData: initData.toString(),
    });
  };

  const mutation = useLoginTelegramMutation();

  return (
    <LoginButton
      botUsername="PurpleStudioBot"
      onAuthCallback={handleAuth}
      buttonSize="medium"
      cornerRadius={8}
      showAvatar={true}
    />
  );
};
