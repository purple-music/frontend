import { Content } from "next/font/google";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FaBook, FaMusic } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

import ButtonGroup from "@/components/atoms/ButtonGroup/ButtonGroup";
import Typography from "@/components/atoms/Typography/Typography";
import PersonalBookings from "@/components/organisms/PersonalBookings/PersonalBookings";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import MyTemplate from "@/components/templates/MyTemplate/MyTemplate";

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
  return (
    <MyTemplate>
      <ButtonGroup
        buttons={[
          { label: "Home", value: "home" },
          { label: "Library", value: "library" },
        ]}
      />
      <PersonalBookings date={new Date()} bookings={[]} />
    </MyTemplate>
  );
};
