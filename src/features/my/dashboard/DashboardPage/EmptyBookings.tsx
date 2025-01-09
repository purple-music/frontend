import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import Surface from "@/components/layout/Surface/Surface";
import Button from "@/components/ui/Button/Button";
import Typography from "@/components/ui/Typography/Typography";

export const EmptyBookings = () => {
  const router = useRouter();
  const { t } = useTranslation("my");

  return (
    <Surface className={"w-full max-w-xl items-center gap-4 !p-8"}>
      <Image
        src="/logo.webp"
        alt={t("dashboard.no-bookings.image-alt")}
        width={200}
        height={200}
        className={"rounded-[24px]"}
      />
      <Typography variant="title" size="large" className="text-center">
        {t("dashboard.no-bookings.description")}
      </Typography>
      <Button
        variant="filled"
        className="w-full"
        onClick={() => router.push("/my/booking")}
        label={t("dashboard.no-bookings.action")}
      />
    </Surface>
  );
};
