import Typography from "@/components/ui/Typography/Typography";

export const VerticalTimeline = ({
  cellHeight = "2rem",
  startHour,
  endHour,
}: {
  cellHeight?: string;
  startHour: number;
  endHour: number;
}) => {
  const timeSlots = Array.from({ length: endHour - startHour }).map(
    (_, i) => i + startHour,
  );

  return (
    <div className="flex w-12 flex-col items-center justify-center divide-y divide-outline-variant overflow-clip rounded-l-[16px]">
      {timeSlots.map((hour) => (
        <div
          className={`flex w-full flex-shrink-0 items-end justify-end bg-surface-container-high pr-1`}
          style={{ height: cellHeight }}
          key={hour}
        >
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
};

export default VerticalTimeline;
