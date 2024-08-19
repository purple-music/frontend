export function StartDaySelector({
  onNextClick,
  onPrevClick,
  nextLabel,
  prevLabel,
  disabled,
}: {
  onNextClick: () => void;
  onPrevClick: () => void;
  nextLabel: string;
  prevLabel: string;
  disabled: boolean;
}) {
  return (
    <div className="">
      <button
        className="btn"
        onClick={(e) => onPrevClick()}
        disabled={disabled}
      >
        {prevLabel}
      </button>
      <button
        className="btn ml-4"
        onClick={(e) => onNextClick()}
        disabled={disabled}
      >
        {nextLabel}
      </button>
    </div>
  );
}
