import { FaExclamationTriangle } from "react-icons/fa";

import { AuthCard } from "@/components/auth-card/AuthCard";
import { AuthCardTitle } from "@/components/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/components/auth-card/AuthFooterAction";
import { useTranslation } from "@/i18n/server";

export async function ErrorCard() {
  const { t } = await useTranslation(undefined, "auth");
  return (
    <AuthCard>
      <AuthCardTitle title={"Error!"} />
      <p>{t("error.message")}</p>
      <div className="flex w-full items-center justify-center">
        <FaExclamationTriangle />
      </div>
      <AuthFooterAction href="/auth/login" label="Go back to login page" />
    </AuthCard>
  );
}
