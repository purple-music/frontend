import { format } from "date-fns";
import { ReactNode } from "react";

export function StartDaySelector({
  onNextClick,
  onPrevClick,
  nextLabel,
  prevLabel,
  disabled,
  day,
}: {
  onNextClick: () => void;
  onPrevClick: () => void;
  nextLabel: ReactNode;
  prevLabel: ReactNode;
  disabled: boolean;
  day: Date;
}) {
  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <button
        className="btn btn-circle"
        onClick={(e) => {
          e.preventDefault();
          return onPrevClick();
        }}
        disabled={disabled}
      >
        {prevLabel}
      </button>
      <button
        className="btn btn-circle"
        onClick={(e) => {
          e.preventDefault();
          return onNextClick();
        }}
        disabled={disabled}
      >
        {nextLabel}
      </button>
      {/* TODO: use Luxon */}
      <span>{format(day, "EEE dd MMMM")}</span>
    </div>
  );
}
