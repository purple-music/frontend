import { DateTime } from "luxon";

import Surface from "@/components/layout/Surface/Surface";
import TimetableBody from "@/features/my/view/Timetable/TimetableBody";
import TimetableHeader from "@/features/my/view/Timetable/TimetableHeader";
import { TimeSlotsGroupedByDay } from "@/features/my/view/ViewPage/ViewPage";
import { StudioId } from "@/lib/types";

const openHour = 9;
const closeHour = 21;

interface TimetableProps {
  startDate: Date;
  endDate: Date;
  timezone: string;
  studios: StudioId[];
  timeSlotsGroupedByDay: TimeSlotsGroupedByDay;
}

const Timetable = ({
  startDate,
  endDate,
  timezone,
  studios,
  timeSlotsGroupedByDay,
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
        timeSlotsGroupedByDay={timeSlotsGroupedByDay}
      />
    </Surface>
  );
};

export default Timetable;
