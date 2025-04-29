import { LoginButton, TelegramAuthData } from "@telegram-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useLoginTelegramMutation from "@/api/mutations/auth/login-telegram";
import { ErrorToast } from "@/components/ui/toasts/ErrorToast";

export const TelegramButton = () => {
  const router = useRouter();
  const handleAuth = (data: TelegramAuthData) => {
    const initData = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      initData.append(key, value);
    });

    mutation.mutate(
      {
        initData: initData.toString(),
      },
      {
        onSuccess: () => {
          router.push("/my");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.custom(() => <ErrorToast>Telegram login failed</ErrorToast>);
        },
      },
    );
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
