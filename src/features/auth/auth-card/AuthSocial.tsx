import { getBackendUrl } from "@/actions/getBackendUrl";
import { YandexButton } from "@/features/auth/auth-card/YandexButton";

export async function AuthSocial() {
  const backendUrl = await getBackendUrl();

  return (
    <div className="flex w-full flex-col gap-2">
      <YandexButton backendUrl={backendUrl} />
    </div>
  );
}
