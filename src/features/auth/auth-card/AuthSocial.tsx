import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaYandex } from "react-icons/fa6";

export function YandexButton() {
  const { t } = useTranslation("auth");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL is not defined");
  }

  return (
    <Link
      href={`${backendUrl}/auth/yandex`}
      className="btn flex w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
    >
      <FaYandex />
      <span>{t("social.yandex-login")}</span>
    </Link>
  );
}

export function AuthSocial() {
  return (
    <div className="flex w-full flex-col gap-2">
      <YandexButton />
    </div>
  );
}
