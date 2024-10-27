import { Content } from "next/font/google";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FaBook, FaMusic } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

import Typography from "@/components/atoms/Typography/Typography";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";

interface MyTemplateProps {
  children: ReactNode;
}

const MyTemplate = ({ children }: MyTemplateProps) => {
  const [page, setPage] = useState<"home" | "library" | "search">("home");
  const buttons = [
    { label: "Home", value: "home", icon: <FaHouse size={20} /> },
    { label: "Library", value: "library", icon: <FaBook size={20} /> },
    { label: "Search", value: "search", icon: <FaMusic size={20} /> },
  ];

  const defaultValue = "home";
  const onClick = (value: string) => {};

  return (
    <div className="flex h-screen w-full gap-8 flex-row bg-surface-container p-8">
      <Sidebar
        buttons={buttons}
        defaultValue={defaultValue}
        onClick={onClick}
      />

      <main className="h-full bg-surface-container-lowest flex-1 p-8 rounded-[28px] flex flex-col gap-8 justify-start items-start">
        <Typography variant="headline" size="large">
          {page}
        </Typography>
        {children}
      </main>
    </div>
  );
};

export default MyTemplate;

