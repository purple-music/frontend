"use client";

import { notFound, usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FaBook, FaMusic } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

import BottomNavbar from "@/components/layout/BottomNavbar/BottomNavbar";
import { NavbarButton } from "@/components/layout/Navbar/Navbar";
import TopAppBar from "@/components/layout/TopAppBar/TopAppBar";
import Typography from "@/components/ui/Typography/Typography";
import Sidebar from "@/features/my/layout/Sidebar/Sidebar";

export type MyPage = "" | "view" | "booking";

interface MyTemplateProps {
  children: ReactNode;
}

// TODO: try to make it server component
const MyTemplate = ({ children }: MyTemplateProps) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Extract the relevant part of the pathname
  const pageFromPath = pathname.split("/")[3] || "";

  // Define allowed pages as a set for quick lookup
  const validPages: Record<string, MyPage> = {
    "": "",
    view: "view",
    booking: "booking",
  };

  // Match the page or trigger a 404
  const page = validPages[pageFromPath];
  if (page === undefined) {
    notFound();
  }

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
    <>
      <div className="flex h-dvh w-full flex-col bg-surface-container pb-20 pt-0 md:flex-row md:gap-8 md:p-8 md:pt-8">
        <TopAppBar
          className="md:hidden"
          isProfileModalOpen={isProfileModalOpen}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
        <Sidebar
          buttons={buttons}
          defaultHref={defaultHref}
          className="hidden md:flex"
          isProfileModalOpen={isProfileModalOpen}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />

        <main className="flex h-full flex-1 flex-col items-start justify-start gap-8 overflow-auto bg-surface-container-lowest p-4 md:rounded-[32px] md:p-8">
          <Typography variant="headline" size="large">
            {/* TODO: move label to page */}
            {/* Get label by href */}
            {buttons.find((button) => button.href === `/my/${page}`)?.label}
          </Typography>
          {children}
        </main>
        <BottomNavbar className="md:hidden" buttons={buttons} />
      </div>
    </>
  );
};

export default MyTemplate;
