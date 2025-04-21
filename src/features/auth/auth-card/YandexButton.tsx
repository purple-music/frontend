import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaYandex } from "react-icons/fa6";

export function YandexButton({ backendUrl }: { backendUrl: string }) {
  const { t } = useTranslation("auth");

  if (!backendUrl) {
    throw new Error("BACKEND_URL is not defined");
  }

  return (
    <Link
      href={`${backendUrl}/api/auth/yandex`}
      className="btn flex w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
    >
      <FaYandex />
      <span>{t("social.yandex-login")}</span>
    </Link>
  );
}
