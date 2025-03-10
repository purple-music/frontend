import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { useTranslation } from "react-i18next";
import {
  FaCircleHalfStroke,
  FaKey,
  FaLanguage,
  FaRightFromBracket,
  FaUserPen,
  FaXmark,
} from "react-icons/fa6";

import { useLogoutMutation } from "@/api/mutations/auth/logout";
import Button from "@/components/ui/Button/Button";
import Divider from "@/components/ui/Divider/Divider";
import IconButton from "@/components/ui/IconButton/IconButton";
import Typography from "@/components/ui/Typography/Typography";

const ProfileModalHeader = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  const { t } = useTranslation("my");

  return (
    <div className={"flex w-full flex-row items-center justify-between"}>
      {/*Empty left*/}
      <div className={"flex h-10 w-10 shrink-0"}></div>
      {/*Center*/}
      <div className={"flex flex-grow flex-col items-center justify-center"}>
        <Typography variant={"title"} size={"large"} className={"text-center"}>
          {t("profile.title")}
        </Typography>
      </div>
      {/*Right*/}
      <div className={"flex h-10 w-10 shrink-0 justify-end"}>
        <IconButton onClick={() => setIsOpen(false)} variant={"text"}>
          <FaXmark />
        </IconButton>
      </div>
    </div>
  );
};

interface MenuItemInterface {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const MenuItem = ({ icon, label, onClick }: MenuItemInterface) => {
  return (
    <Button
      className={
        "flex w-full flex-row items-center !justify-start gap-4 rounded-[16px] p-4"
      }
      onClick={onClick}
      label={label}
      startIcon={icon}
      variant={"text"}
    ></Button>
  );
};

export interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ProfileModal = ({ isOpen, setIsOpen }: ProfileModalProps) => {
  const { t } = useTranslation("my");

  const mutation = useLogoutMutation();

  const router = useRouter();

  const handleLogout = async () => {
    await mutation.mutateAsync();
    await router.push("/auth");
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDismissable
      className={
        "fixed inset-0 z-20 flex min-h-full items-center justify-center overflow-y-auto bg-scrim/50 p-4 text-center backdrop-blur"
      }
    >
      <Modal
        className={
          "w-full max-w-md overflow-hidden rounded-[32px] bg-surface p-6 text-left align-middle shadow-xl"
        }
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          <ProfileModalHeader setIsOpen={setIsOpen} />
          <div>
            <MenuItem
              icon={<FaUserPen />}
              label={t("profile.edit-profile")}
              onClick={() => {}}
            />
            <MenuItem
              icon={<FaKey />}
              label={t("profile.change-password")}
              onClick={() => {}}
            />
            <MenuItem
              icon={<FaCircleHalfStroke />}
              label={t("profile.switch-theme")}
              onClick={() => {}}
            />
            <MenuItem
              icon={<FaLanguage />}
              label={t("profile.switch-language")}
              onClick={() => {}}
            />
            <Divider />
            <MenuItem
              icon={<FaRightFromBracket />}
              label={t("profile.logout")}
              onClick={handleLogout}
            />
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default ProfileModal;
