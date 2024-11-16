import { DateTime } from "luxon";

import Typography from "@/components/atoms/Typography/Typography";
import { VerticalTimeline } from "@/components/atoms/VerticalTimeline/VerticalTimeline";
import { StudioId } from "@/lib/types";

interface TimetableBodyDayStudioProps {
  studio: StudioId;
  date: DateTime;
  timezone: string;
  timeSlots: number[];
}

const TimetableContentDayStudio = ({
  studio,
  date,
  timezone,
  timeSlots,
}: TimetableBodyDayStudioProps) => {
  return (
    <div className="flex-col flex-1 flex items-center justify-center h-full divide-y divide-surface-container-high">
      {timeSlots.map((hour) => (
        <div
          key={hour}
          className={`h-8 w-full flex items-start justify-center box-border`}
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
}

const TimetableBodyDay = ({
  date,
  timezone,
  studios,
  timeSlots,
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
}

const TimetableBody = ({
  dates,
  timezone,
  openHour,
  closeHour,
  studios,
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
          />
        ))}
      </div>
    </div>
  );
};

export default TimetableBody;

