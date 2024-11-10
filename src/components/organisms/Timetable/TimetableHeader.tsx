import { DateTime } from "luxon";

import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";
import {
  getOneLetterStudioName,
  getSoftStudioColor,
} from "@/lib/utils/studios";

const TimetableHeaderDayStudios = ({ studios }: { studios: StudioId[] }) => (
  <div className="flex flex-row justify-between h-8">
    {studios.map((studio) => (
      <div
        key={studio}
        className={`flex-1 ${getSoftStudioColor(studio)} flex items-center justify-center`}
      >
        {getOneLetterStudioName(studio)}
      </div>
    ))}
  </div>
);

const TimetableHeaderTimezone = ({ timezone }: { timezone: string }) => (
  <div className="w-12 flex items-center flex-col justify-center">
    <Typography variant="label" className="text-on-surface-variant">
      {timezone}
    </Typography>
  </div>
);

const TimetableHeaderDayDate = ({
  date,
  timezone,
}: {
  date: DateTime;
  timezone: string;
}) => (
  <div className="h-16 flex items-center flex-col justify-center">
    <Typography variant="label" className="text-on-surface-variant">
      {date.toLocaleString({ weekday: "short" })}
    </Typography>
    <Typography variant="title" size="large" className="text-on-surface">
      {date.toLocaleString({ day: "numeric" })}
    </Typography>
  </div>
);

const TimetableHeaderDay = ({
  date,
  timezone,
  studios,
}: {
  date: DateTime;
  timezone: string;
  studios: StudioId[];
}) => {
  return (
    <div className="min-w-2 flex-1 flex flex-col">
      <TimetableHeaderDayDate date={date} timezone={timezone} />
      <TimetableHeaderDayStudios studios={studios} />
    </div>
  );
};

interface TimetableHeaderProps {
  dates: DateTime[];
  timezone: string;
  studios: StudioId[];
}

const TimetableHeader = ({
  dates,
  timezone,
  studios,
}: TimetableHeaderProps) => {
  return (
    <div className="flex flex-row justify-between">
      <TimetableHeaderTimezone timezone={timezone} />
      {dates.map((date) => (
        <TimetableHeaderDay
          key={date.toISO()}
          date={date}
          timezone={timezone}
          studios={studios}
        />
      ))}
    </div>
  );
};

export default TimetableHeader;
