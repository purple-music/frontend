import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import {
  FaChevronDown,
  FaPencil,
  FaPerson,
  FaRegClock,
  FaTrash,
} from "react-icons/fa6";

import { TimeSlot } from "@/api/queries/time-slots/time-slots";
import Surface from "@/components/layout/Surface/Surface";
import Divider from "@/components/ui/Divider/Divider";
import IconButton from "@/components/ui/IconButton/IconButton";
import IconLabel from "@/components/ui/IconLabel/IconLabel";
import PseudoLine from "@/components/ui/PseudoLine/PseudoLine";
import Typography from "@/components/ui/Typography/Typography";
import { Hour } from "@/lib/types";
import { getSoftStudioColor } from "@/lib/utils/studios";

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
    <div className="flex h-6 items-center">
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

interface TimeSlotCardProps {
  slot: TimeSlot;
}

const TimeSlotCard = ({ slot }: TimeSlotCardProps) => {
  return (
    <div className="flex h-20 w-full flex-row items-center justify-between rounded-[16px] bg-surface-container-lowest p-4">
      <PseudoLine color={`${getSoftStudioColor(slot.studioId)}`}>
        <Typography variant="body" size="large">
          {slot.studioId}
        </Typography>
      </PseudoLine>
      <div className="flex items-center">
        <div className="flex h-6 items-center">
          <IconLabel icon={<FaRegClock size={20} />} label="09:00" />
          <Divider direction="vertical" />
          <IconLabel
            icon={<FaPerson size={20} />}
            label={`${slot.peopleCount}`}
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

interface TimeSlotCardsGroupedByDayProps {
  date: Date;
  timeSlots: TimeSlot[];
}

const TimeSlotCardsGroupedByDay = ({
  date,
  timeSlots,
}: TimeSlotCardsGroupedByDayProps) => {
  const { t } = useTranslation("my");

  if (timeSlots.length === 0)
    return (
      <Surface className="w-full">
        <Typography variant={"label"} size={"large"} className="text-center">
          {t("dashboard.no-bookings")}
        </Typography>
      </Surface>
    );

  // Get min and max amount of people
  const allPeopleCount = timeSlots.map((booking) => booking.peopleCount);
  const totalPeopleFrom = Math.min(...allPeopleCount);
  const totalPeopleTo = Math.max(...allPeopleCount);

  return (
    <Surface className="w-full">
      <div className="flex h-12 w-full items-center justify-between px-2">
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

      <div className="flex w-full flex-col gap-4">
        {timeSlots.map((slot) => (
          <TimeSlotCard
            key={`${slot.startTime}_${slot.studioId}`}
            slot={slot}
          />
        ))}
      </div>
    </Surface>
  );
};

export default TimeSlotCardsGroupedByDay;
