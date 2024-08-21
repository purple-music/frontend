export function TableTimeColumn({
  cellHeight,
  startHour,
  endHour,
}: {
  cellHeight: number;
  startHour: number;
  endHour: number;
}) {
  return Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i,
  ).map((hour) => (
    <div key={hour} style={{ height: `${cellHeight}rem` }}>
      {hour}:00
    </div>
  ));
}
