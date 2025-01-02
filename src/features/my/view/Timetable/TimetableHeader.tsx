import { DateTime } from "luxon";

import StudiosHeader from "@/components/shared/StudiosHeader/StudiosHeader";
import Typography from "@/components/ui/Typography/Typography";
import { StudioId } from "@/lib/types";

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
      <div className="flex flex-col flex-1">
        <div className="flex flex-row divide-x divide-outline-variant">
          {dates.map((date) => (
            <div key={date.toISO()} className="min-w-2 flex-1 flex flex-col">
              <TimetableHeaderDayDate date={date} timezone={timezone} />
            </div>
          ))}
        </div>
        <div className="flex flex-row rounded-t-[16px] overflow-clip divide-x divide-outline-variant">
          {dates.map((date, index) => (
            <div
              key={date.toISO()}
              className={"min-w-2 flex-1 flex flex-row overflow-clip"}
            >
              <StudiosHeader studios={studios} studioNameSize="letter" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableHeader;
