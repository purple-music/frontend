import { DateTime } from "luxon";

import { VerticalTimeline } from "@/components/atoms/VerticalTimeline/VerticalTimeline";
import { StudioId } from "@/lib/types";
import { getSoftStudioColor, getStudioColor } from "@/lib/utils/studios";

interface TimetableBodyDayStudioProps {
  studio: StudioId;
  date: DateTime;
  timezone: string;
  timeSlots: number[];
  busySlots: Date[];
}

const TimetableContentDayStudio = ({
  studio,
  date,
  timezone,
  timeSlots,
  busySlots,
}: TimetableBodyDayStudioProps) => {
  return (
    <div className="flex-col flex-1 flex items-center justify-center h-full divide-y divide-surface-container-high relative">
      {timeSlots.map((hour) => (
        <div
          key={hour}
          className={`h-8 w-full flex items-start justify-center box-border`}
        ></div>
      ))}
      {busySlots.map((slot) => (
        <div
          key={slot.getTime()}
          className={`absolute left-0 right-0 bottom-0 w-full h-8 flex items-center justify-center ${getSoftStudioColor(studio)}`}
          style={{
            top: `calc(${slot.getHours() - timeSlots[0]} * 2rem)`,
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
  busySlots: Record<StudioId, Date[]>;
}

const TimetableBodyDay = ({
  date,
  timezone,
  studios,
  timeSlots,
  busySlots,
}: TimetableBodyDayProps) => {
  return (
    <div className="flex flex-1 flex-row justify-between bg-surface-container-lowest divide-x divide-surface-container-high">
      {studios.map((studio) => (
        <TimetableContentDayStudio
          key={studio}
          studio={studio}
          date={date}
          timezone={timezone}
          timeSlots={timeSlots}
          busySlots={busySlots[studio] || []}
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
  busySlots: Record<string, Record<StudioId, Date[]>>;
}

const TimetableBody = ({
  dates,
  timezone,
  openHour,
  closeHour,
  studios,
  busySlots,
}: TimetableBodyProps) => {
  const timeSlots = Array.from({ length: closeHour - openHour }).map(
    (_, i) => i + openHour,
  );

  return (
    <div className="flex flex-row justify-between rounded-[16px] rounded-tr-none overflow-clip">
      <VerticalTimeline startHour={openHour} endHour={closeHour} />
      <div className="flex flex-row flex-1 divide-x divide-outline-variant">
        {dates.map((date) => (
          <TimetableBodyDay
            key={date.toISO()}
            date={date}
            timezone={timezone}
            studios={studios}
            timeSlots={timeSlots}
            busySlots={busySlots[date.toFormat("yyyy-MM-dd")] || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default TimetableBody;
