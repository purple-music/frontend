import { differenceInHours } from "date-fns";
import { DateTime } from "luxon";

import { TimeSlot } from "@/api/queries/time-slots/time-slots";
import { VerticalTimeline } from "@/components/shared/VerticalTimeline/VerticalTimeline";
import {
  TimeSlotsGroupedByDay,
  TimeSlotsGroupedByStudio,
} from "@/features/my/view/ViewPage/ViewPage";
import { StudioId } from "@/lib/types";
import { getSoftStudioColor, getStudioColor } from "@/lib/utils/studios";

interface TimetableBodyDayStudioProps {
  studio: StudioId;
  date: DateTime;
  timezone: string;
  timeSlots: number[];
  busySlots: TimeSlot[];
}

const TimetableContentDayStudio = ({
  studio,
  date,
  timezone,
  timeSlots,
  busySlots,
}: TimetableBodyDayStudioProps) => {
  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center divide-y divide-surface-container-high">
      {timeSlots.map((hour) => (
        <div
          key={hour}
          className={`box-border flex h-8 w-full items-start justify-center`}
        ></div>
      ))}
      {busySlots.map((slot) => (
        <div
          key={slot.startTime}
          className={`absolute bottom-0 left-0 right-0 flex h-8 w-full items-center justify-center ${getSoftStudioColor(studio)}`}
          style={{
            top: `calc(${differenceInHours(
              slot.endTime,
              slot.startTime,
            )} * 2rem)`,
          }}
        ></div>
      ))}
    </div>
  );
};

interface TimetableBodyDayProps {
  date: DateTime;
  timezone: string;
  studios: StudioId[];
  timeSlots: number[];
  timeSlotsGroupedByStudio: TimeSlotsGroupedByStudio;
}

const TimetableBodyDay = ({
  date,
  timezone,
  studios,
  timeSlots,
  timeSlotsGroupedByStudio,
}: TimetableBodyDayProps) => {
  return (
    <div className="flex flex-1 flex-row justify-between divide-x divide-surface-container-high bg-surface-container-lowest">
      {studios.map((studio) => (
        <TimetableContentDayStudio
          key={studio}
          studio={studio}
          date={date}
          timezone={timezone}
          timeSlots={timeSlots}
          busySlots={timeSlotsGroupedByStudio[studio] || []}
        />
      ))}
    </div>
  );
};

interface TimetableBodyProps {
  dates: DateTime[];
  timezone: string;
  openHour: number;
  closeHour: number;
  studios: StudioId[];
  timeSlotsGroupedByDay: TimeSlotsGroupedByDay;
}

const TimetableBody = ({
  dates,
  timezone,
  openHour,
  closeHour,
  studios,
  timeSlotsGroupedByDay,
}: TimetableBodyProps) => {
  const timeSlots = Array.from({ length: closeHour - openHour }).map(
    (_, i) => i + openHour,
  );

  return (
    <div className="flex flex-row justify-between overflow-clip rounded-[16px] rounded-tr-none">
      <VerticalTimeline startHour={openHour} endHour={closeHour} />
      <div className="flex flex-1 flex-row divide-x divide-outline-variant">
        {dates.map((date) => (
          <TimetableBodyDay
            key={date.toISO()}
            date={date}
            timezone={timezone}
            studios={studios}
            timeSlots={timeSlots}
            timeSlotsGroupedByStudio={
              timeSlotsGroupedByDay[date.toFormat("yyyy-MM-dd")] || {}
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TimetableBody;
