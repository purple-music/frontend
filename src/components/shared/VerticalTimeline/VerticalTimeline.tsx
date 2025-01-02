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
    <div className="w-12 flex items-center flex-col justify-center divide-y divide-outline-variant rounded-l-[16px] overflow-clip">
      {timeSlots.map((hour) => (
        <div
          className={`w-full flex items-end justify-end pr-1 flex-shrink-0 bg-surface-container-high`}
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
