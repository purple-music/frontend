import { TelegramButton } from "@/features/auth/auth-card/TelegramButton";
import { YandexButton } from "@/features/auth/auth-card/YandexButton";

export interface AuthSocialProps {
  backendUrl: string;
}

export function AuthSocial(props: AuthSocialProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <YandexButton backendUrl={props.backendUrl} />
      <TelegramButton />
    </div>
  );
}
