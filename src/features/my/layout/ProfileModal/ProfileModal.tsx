import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { FaXmark } from "react-icons/fa6";

import IconButton from "@/components/ui/IconButton/IconButton";
import Typography from "@/components/ui/Typography/Typography";

const ProfileModalHeader = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <div className={"flex w-full flex-row"}>
      {/*Empty left*/}
      <div className={"flex h-10 w-full"}></div>
      {/*Center*/}
      <div className={"flex h-10 w-full flex-col items-center justify-center"}>
        <Typography variant={"title"} className={"text-center"}>
          Profile
        </Typography>
      </div>
      {/*Right*/}
      <div className={"flex h-10 w-full justify-end"}>
        <IconButton onClick={() => setIsOpen(false)} variant={"text"}>
          <FaXmark />
        </IconButton>
      </div>
    </div>
  );
};

export interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ProfileModal = ({ isOpen, setIsOpen }: ProfileModalProps) => {
  console.log("ProfileModal", { isOpen, setIsOpen });
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDismissable
      className={
        "bg-scrim/50 fixed inset-0 z-20 flex min-h-full items-center justify-center overflow-y-auto p-4 text-center backdrop-blur"
      }
    >
      <Modal
        className={
          "w-full max-w-md overflow-hidden rounded-[32px] bg-surface p-6 text-left align-middle shadow-xl"
        }
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          <ProfileModalHeader setIsOpen={setIsOpen} />
          Menu
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default ProfileModal;
