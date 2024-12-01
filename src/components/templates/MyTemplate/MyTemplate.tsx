import { ReactNode } from "react";
import { FaBook, FaMusic } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

import Typography from "@/components/atoms/Typography/Typography";
import { NavbarButton } from "@/components/molecules/Navbar/Navbar";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";

export type MyPage = "" | "view" | "booking";

interface MyTemplateProps {
  children: ReactNode;
  page: MyPage;
}

const MyTemplate = ({ children, page }: MyTemplateProps) => {
  const buttons: NavbarButton[] = [
    { label: "Dashboard", href: "", icon: <FaHouse size={20} /> },
    { label: "View", href: "view", icon: <FaBook size={20} /> },
    { label: "Booking", href: "booking", icon: <FaMusic size={20} /> },
  ]
    .map((button) => ({
      ...button,
      isSelected: page === button.href,
    }))
    .map((button) => ({ ...button, href: `/my/${button.href}` }));

  const defaultHref = "/";

  return (
    <div className="flex h-screen w-full gap-8 flex-row bg-surface-container p-8">
      <Sidebar buttons={buttons} defaultHref={defaultHref} />

      <main className="h-full bg-surface-container-lowest flex-1 p-8 rounded-[32px] flex flex-col gap-8 justify-start items-start overflow-auto">
        <Typography variant="headline" size="large">
          {/* Get label by href */}
          {buttons.find((button) => button.href === `/my/${page}`)?.label}
        </Typography>
        {children}
      </main>
    </div>
  );
};

export default MyTemplate;
