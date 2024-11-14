import { DateTime } from "luxon";

import Surface from "@/components/atoms/Surface/Surface";
import TimetableContent from "@/components/organisms/Timetable/TimetableContent";
import { TimetableContent as TimetableContentOld } from "@/components/organisms/Timetable/TimetableContentOld";
import TimetableHeader from "@/components/organisms/Timetable/TimetableHeader";
import { StudioId } from "@/lib/types";

const openHour = 9;
const closeHour = 21;

interface TimetableProps {
  startDate: Date;
  endDate: Date;
  timezone: string;
  studios: StudioId[];
}

const Timetable = ({
  startDate,
  endDate,
  timezone,
  studios,
}: TimetableProps) => {
  const start = DateTime.fromJSDate(startDate);
  const end = DateTime.fromJSDate(endDate);
  const dates = [];

  for (let d = start; d <= end; d = d.plus({ days: 1 })) {
    dates.push(d);
  }

  return (
    <>
      {/* <TimetableContentOld
        bookings={[]}
        days={30}
        studios={["blue", "orange", "purple"]}
      /> */}
      <Surface className="w-full !gap-0">
        <TimetableHeader dates={dates} timezone={timezone} studios={studios} />
        <TimetableContent
          dates={dates}
          timezone={timezone}
          studios={studios}
          openHour={openHour}
          closeHour={closeHour}
        />
      </Surface>
    </>
  );
};

export default Timetable;

