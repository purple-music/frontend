import { DateTime } from "luxon";

import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";
import {
  getOneLetterStudioName,
  getSoftStudioColor,
} from "@/lib/utils/studios";

import styles from "./Timetable.module.css";

const TimetableHeaderDayStudios = ({ studios }: { studios: StudioId[] }) => (
  <div
    className={`flex flex-row justify-between h-8 ${styles["header-day-studios"]}`}
  >
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
    <div
      className={`min-w-2 flex-1 flex flex-col overflow-clip ${styles["header-day"]}`}
    >
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
      <div className="flex flex-row flex-1 divide-x divide-outline-variant">
        {dates.map((date) => (
          <TimetableHeaderDay
            key={date.toISO()}
            date={date}
            timezone={timezone}
            studios={studios}
          />
        ))}
      </div>
    </div>
  );
};

export default TimetableHeader;
