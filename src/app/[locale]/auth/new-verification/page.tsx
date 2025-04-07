import { Namespace } from "@/app/i18n";
import WithTranslation from "@/components/shared/providers/TranslationsProvider";
import NewVerificationForm from "@/features/auth/NewVerificationForm";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  return (
    <WithTranslation locale={locale} namespaces={[Namespace.AUTH]}>
      <NewVerificationForm />
    </WithTranslation>
  );
}
