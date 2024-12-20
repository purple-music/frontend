import { DateTime } from "luxon";

import Surface from "@/components/atoms/Surface/Surface";
import TimetableBody from "@/components/organisms/Timetable/TimetableBody";
import TimetableHeader from "@/components/organisms/Timetable/TimetableHeader";
import { StudioId } from "@/lib/types";

const openHour = 9;
const closeHour = 21;

interface TimetableProps {
  startDate: Date;
  endDate: Date;
  timezone: string;
  studios: StudioId[];
  busySlots: Record<string, Record<StudioId, Date[]>>;
}

const Timetable = ({
  startDate,
  endDate,
  timezone,
  studios,
  busySlots,
}: TimetableProps) => {
  const start = DateTime.fromJSDate(startDate);
  const end = DateTime.fromJSDate(endDate);
  const dates = [];

  for (let d = start; d < end; d = d.plus({ days: 1 })) {
    dates.push(d);
  }

  return (
    <Surface className="w-full !gap-0">
      <TimetableHeader dates={dates} timezone={timezone} studios={studios} />
      <TimetableBody
        dates={dates}
        timezone={timezone}
        studios={studios}
        openHour={openHour}
        closeHour={closeHour}
        busySlots={busySlots}
      />
    </Surface>
  );
};

export default Timetable;
