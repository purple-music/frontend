import { FaYandex } from "react-icons/fa6";

import { authYandex } from "@/actions/mutation/login";
import { useTranslation } from "@/i18n/client";

export function YandexButton() {
  const { t } = useTranslation(undefined, "auth");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        authYandex();
      }}
    >
      <button
        type="submit"
        className="btn flex w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
      >
        <FaYandex />
        <span>{t("social.yandex-login")}</span>
      </button>
    </form>
  );
}

export function AuthSocial() {
  return (
    <div className="flex w-full flex-col gap-2">
      <YandexButton />
    </div>
  );
}
