import { DateTime } from "luxon";

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
      <div className="flex flex-col bg-surface-container-low rounded-[32px] p-4 w-full">
        <TimetableHeader dates={dates} timezone={timezone} studios={studios} />
        <TimetableContent
          dates={dates}
          timezone={timezone}
          studios={studios}
          openHour={openHour}
          closeHour={closeHour}
        />
      </div>
    </>
  );
};

export default Timetable;
