export function TableTimeColumn({
  cellHeight,
  cellMinWidth,
  startHour,
  endHour,
}: {
  cellMinWidth: string;
  cellHeight: string;
  startHour: number;
  endHour: number;
}) {
  return Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i,
  ).map((hour) => (
    <div key={hour} style={{ height: cellHeight, minWidth: cellMinWidth }}>
      {hour}:00
    </div>
  ));
}

