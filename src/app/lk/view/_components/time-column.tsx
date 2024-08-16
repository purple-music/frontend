export function TimeColumn({
  cellHeight,
  startHour,
  endHour,
}: {
  cellHeight: number;
  startHour: number;
  endHour: number;
}) {
  return (
    <div>
      <div style={{ height: `${cellHeight * 2}rem` }} />
      <div className="flex flex-col items-end border-t border-gray-500 pr-1">
        {Array.from(
          { length: endHour - startHour },
          (_, i) => startHour + i,
        ).map((hour) => (
          <div key={hour} style={{ height: `${cellHeight}rem` }}>
            {hour}:00
          </div>
        ))}
      </div>
    </div>
  );
}
