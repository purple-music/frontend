import { DateTime } from "luxon";

import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";

const TimetableContentTime = ({ timeSlots }: { timeSlots: number[] }) => (
  <div className="w-12 flex items-center flex-col justify-center bg-surface-container-high divide-y divide-outline-variant">
    {timeSlots.map((hour) => (
      <div className="h-8 w-full flex items-end justify-end pr-1">
        <Typography
          key={hour}
          variant="label"
          className="text-on-surface-variant"
        >
          {hour}:00
        </Typography>
      </div>
    ))}
  </div>
);

interface TimetableContentDayProps {
  date: DateTime;
  timezone: string;
  studios: StudioId[];
  timeSlots: number[];
}

interface TimetableContentDayStudioProps {
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
}: TimetableContentDayStudioProps) => {
  return (
    <div className="flex-col flex-1 flex items-center justify-center h-full w-full divide-y divide-surface-container-high">
      {timeSlots.map((hour) => (
        <div
          key={hour}
          className={`h-8 w-full flex items-start justify-center box-border`}
        ></div>
      ))}
    </div>
  );
};

const TimetableContentDay = ({
  date,
  timezone,
  studios,
  timeSlots,
}: TimetableContentDayProps) => {
  return (
    <div className="flex flex-1 flex-row justify-between bg-surface-container-lowest divide-x divide-surface-container-high">
      {studios.map((studio) => (
        <TimetableContentDayStudio
          studio={studio}
          date={date}
          timezone={timezone}
          timeSlots={timeSlots}
        />
      ))}
    </div>
  );
};

interface TimetableContentProps {
  dates: DateTime[];
  timezone: string;
  openHour: number;
  closeHour: number;
  studios: StudioId[];
}

const TimetableContent = ({
  dates,
  timezone,
  openHour,
  closeHour,
  studios,
}: TimetableContentProps) => {
  const timeSlots = Array.from({ length: closeHour - openHour }).map(
    (_, i) => i + openHour,
  );

  return (
    <div className="flex flex-row justify-between rounded-[16px] rounded-tr-none overflow-clip">
      <TimetableContentTime timeSlots={timeSlots} />
      <div className="flex flex-row flex-1 divide-x divide-outline-variant">
        {dates.map((date) => (
          <TimetableContentDay
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

export default TimetableContent;
