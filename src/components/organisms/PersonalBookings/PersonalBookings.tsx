import { ReactNode } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import {
  FaArrowDown,
  FaChevronDown,
  FaPencil,
  FaPeopleGroup,
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

interface PersonalBookingProps {
  booking: PersonalBooking;
}

const PersonalBooking = ({ booking }: PersonalBookingProps) => {
  return (
    <div className="w-full bg-surface-container-lowest h-10 items-center flex rounded-[16px]">
      <PseudoLine color="bg-brand-purple">
        <Typography variant="label">{booking.studio}</Typography>
      </PseudoLine>
    </div>
  );
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
        label={`${totalPeopleFrom} - ${totalPeopleTo}`}
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

function groupBookingsByStudio(
  bookings: PersonalBooking[],
): Record<StudioId, PersonalBooking[]> {
  return bookings.reduce(
    (grouped, booking) => {
      // If the studio doesn't exist in the grouped object, create an empty array
      if (!grouped[booking.studio]) {
        grouped[booking.studio] = [];
      }

      // Add the booking to its studio's array
      grouped[booking.studio].push(booking);

      return grouped;
    },
    {} as Record<StudioId, PersonalBooking[]>,
  );
}

const PersonalBookings = ({ date, bookings }: PersonalBookingsProps) => {
  // Group bookings by studio
  const groupedBookings = groupBookingsByStudio(bookings);

  return (
    <Surface className="w-full">
      <div className="w-full justify-between flex items-center px-2 h-12">
        <Typography variant="headline" size="small">
          {date.toDateString()}
        </Typography>
        <InfoRibbon
          startHour={9}
          endHour={12}
          totalPeopleFrom={1}
          totalPeopleTo={2}
        />
      </div>

      <div className="w-full gap-4 flex flex-col">
        {Object.keys(groupedBookings).map((name) => (
          <div
            key={name}
            className="w-full bg-surface-container-lowest h-20 items-center rounded-[16px] p-4 flex justify-between flex-row"
          >
            <PseudoLine color={`${getSoftStudioColor(name as StudioId)}`}>
              <Typography variant="body" size="large">
                {name}
              </Typography>
            </PseudoLine>
            <div className="flex items-center">
              <div className="flex items-center h-6">
                <IconLabel icon={<FaRegClock size={20} />} label="09:00" />
                <Divider direction="vertical" />
                <IconLabel icon={<FaPerson size={20} />} label="2" />
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
        ))}
      </div>
    </Surface>
  );
};

export default PersonalBookings;
