import { DateTime } from "luxon";

import { TimeSlot } from "@/api/queries/time-slots/time-slots";
import { VerticalTimeline } from "@/components/shared/VerticalTimeline/VerticalTimeline";
import {
  TimeSlotsGroupedByDay,
  TimeSlotsGroupedByStudio,
} from "@/features/my/view/ViewPage/ViewPage";
import { StudioId } from "@/lib/types";
import { getSoftStudioColor } from "@/lib/utils/studios";

interface TimetableBodyDayStudioProps {
  studio: StudioId;
  date: DateTime;
  timezone: string;
  timeSlots: DateTime[];
  busySlots: TimeSlot[];
}

const floatingDifferenceInHours = (date1: Date, date2: Date) => {
  return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60);
};

const TimetableContentDayStudio = ({
  studio,
  date,
  timezone,
  timeSlots,
  busySlots,
}: TimetableBodyDayStudioProps) => {
  const firstTimeSlot = timeSlots[0];
  if (!firstTimeSlot) return null;
  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center divide-y divide-surface-container-high">
      {timeSlots.map((hour) => (
        <div
          key={hour.hour}
          className={`box-border flex h-8 w-full items-start justify-center`}
        ></div>
      ))}
      {busySlots.map((slot) => {
        return (
          <div
            key={slot.startTime}
            className={`absolute bottom-0 left-0 right-0 flex w-full items-center justify-center rounded-[8px] ${getSoftStudioColor(studio)}`}
            style={{
              top: `calc(${floatingDifferenceInHours(
                new Date(slot.startTime),
                firstTimeSlot.toJSDate(),
              )} * 2rem)`,
              height: `calc(${floatingDifferenceInHours(
                new Date(slot.endTime),
                new Date(slot.startTime),
              )} * 2rem)`,
            }}
          >
            {slot.price}
          </div>
        );
      })}
    </div>
  );
};

interface TimetableBodyDayProps {
  date: DateTime;
  timezone: string;
  studios: StudioId[];
  openHour: number;
  closeHour: number;
  timeSlotsGroupedByStudio: TimeSlotsGroupedByStudio;
}

const TimetableBodyDay = ({
  date,
  timezone,
  studios,
  openHour,
  closeHour,
  timeSlotsGroupedByStudio,
}: TimetableBodyDayProps) => {
  const timeSlots = Array.from({ length: closeHour - openHour }).map((_, i) =>
    DateTime.fromJSDate(date.toJSDate()).set({
      hour: i + openHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  );

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
            openHour={openHour}
            closeHour={closeHour}
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
