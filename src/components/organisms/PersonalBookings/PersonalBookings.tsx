import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";
import {
  FaChevronDown,
  FaPencil,
  FaPerson,
  FaRegClock,
  FaTrash,
} from "react-icons/fa6";

import Divider from "@/components/atoms/Divider/Divider";
import IconButton from "@/components/atoms/IconButton/IconButton";
import IconLabel from "@/components/atoms/IconLabel/IconLabel";
import PseudoLine from "@/components/atoms/PseudoLine/PseudoLine";
import Surface from "@/components/atoms/Surface/Surface";
import Typography from "@/components/atoms/Typography/Typography";
import { Hour, StudioId } from "@/lib/types";
import { getSoftStudioColor } from "@/lib/utils/studios";

export type PersonalBooking = {
  studio: StudioId;
  time: Date;
  people: number;
  status: "unpaid" | "paid" | "cancelled";
  cost: number;
};

type IconLabel = {
  icon: ReactNode;
  label: string;
};

interface InfoRibbonProps {
  startHour: Hour;
  endHour: Hour;
  totalPeopleFrom: number;
  totalPeopleTo: number;
}

const InfoRibbon = ({
  startHour,
  endHour,
  totalPeopleFrom,
  totalPeopleTo,
}: InfoRibbonProps) => {
  return (
    <div className="h-6 items-center flex">
      <IconLabel
        icon={<FaRegClock size={20} />}
        label={`${startHour} - ${endHour}`}
      />
      <Divider direction="vertical" />
      <IconLabel
        icon={<FaPerson size={20} />}
        label={
          totalPeopleFrom === totalPeopleTo
            ? `${totalPeopleFrom}`
            : `${totalPeopleFrom} - ${totalPeopleTo}`
        }
      />
      <Divider direction="vertical" />
      <IconButton variant="outlined" size="sm">
        <FaPlus size={14} />
      </IconButton>
      <Divider direction="vertical" />
      <IconButton variant="filled" size="sm">
        <FaChevronDown size={14} />
      </IconButton>
    </div>
  );
};

interface PersonalBookingsProps {
  date: Date;
  bookings: PersonalBooking[];
}

interface PersonalBookingProps {
  booking: PersonalBooking;
}

const PersonalBooking = ({ booking }: PersonalBookingProps) => {
  return (
    <div className="w-full bg-surface-container-lowest h-20 items-center rounded-[16px] p-4 flex justify-between flex-row">
      <PseudoLine color={`${getSoftStudioColor(booking.studio)}`}>
        <Typography variant="body" size="large">
          {booking.studio}
        </Typography>
      </PseudoLine>
      <div className="flex items-center">
        <div className="flex items-center h-6">
          <IconLabel icon={<FaRegClock size={20} />} label="09:00" />
          <Divider direction="vertical" />
          <IconLabel
            icon={<FaPerson size={20} />}
            label={`${booking.people}`}
          />
          <Divider direction="vertical" />
        </div>
        <div className="flex gap-2">
          <IconButton variant="text">
            <FaPencil size={20} />
          </IconButton>
          <IconButton variant="danger">
            <FaTrash size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const PersonalBookings = ({ date, bookings }: PersonalBookingsProps) => {
  const t = useTranslations("my");

  if (bookings.length === 0)
    return (
      <Surface className="w-full">
        <Typography variant={"label"} size={"large"} className="text-center">
          {t("dashboard.no-bookings")}
        </Typography>
      </Surface>
    );

  // Get min and max amount of people
  const totalPeopleFrom = Math.min(
    ...bookings.map((booking) => booking.people),
  );
  const totalPeopleTo = Math.max(...bookings.map((booking) => booking.people));

  return (
    <Surface className="w-full">
      <div className="w-full justify-between flex items-center px-2 h-12">
        <Typography variant="headline" size="small">
          {date.toDateString()}
        </Typography>
        <InfoRibbon
          startHour={9}
          endHour={12}
          totalPeopleFrom={totalPeopleFrom}
          totalPeopleTo={totalPeopleTo}
        />
      </div>

      <div className="w-full gap-4 flex flex-col">
        {bookings.map((booking) => (
          <PersonalBooking key={booking.time.toISOString()} booking={booking} />
        ))}
      </div>
    </Surface>
  );
};

export default PersonalBookings;
