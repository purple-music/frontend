import { DateTime } from "luxon";

import Typography from "@/components/atoms/Typography/Typography";
import { StudioId } from "@/lib/types";

const TimetableContentTime = ({ timeSlots }: { timeSlots: number[] }) => (
  <div className="w-12 flex items-center flex-col justify-center bg-surface-container-high">
    {timeSlots.map((hour) => (
      <div className="h-8 w-full flex items-center justify-center">
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

const TimetableContentDay = ({
  date,
  timezone,
  studios,
  timeSlots,
}: TimetableContentDayProps) => {
  return (
    <div className="flex flex-1 flex-row justify-between bg-surface-container-lowest">
      {studios.map((studio) => (
        <div
          key={studio}
          className={`flex-1 flex items-center justify-center border-l`}
        >
          {/* {date.setLocale(timezone).toLocaleString({ hour: "numeric" })} */}
        </div>
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
  );
};

export default TimetableContent;
