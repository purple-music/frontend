import { getStudioLabel, studios } from "@/app/[lng]/my/view/_data/studios";
import { StudioId } from "@/lib/types";

export function StudiosSelector({
  selectedStudios,
  selectStudios,
}: {
  selectedStudios: StudioId[];
  selectStudios: (studios: StudioId[]) => void;
}) {
  const handleStudioSelect = (studio: StudioId) => {
    const updatedStudios = selectedStudios.includes(studio)
      ? selectedStudios.length > 1
        ? selectedStudios.filter((s) => s !== studio)
        : selectedStudios // Remove studio if already selected
      : [...selectedStudios, studio]; // Add studio if not selected

    // Sort according to the predefined studios order
    const sortedStudios = updatedStudios.sort(
      (a, b) => studios.indexOf(a) - studios.indexOf(b),
    );

    selectStudios(sortedStudios);
  };

  return (
    <div className="join">
      {studios.map((s, index) => (
        <input
          key={s}
          className="btn join-item"
          type="checkbox"
          name="preset"
          aria-label={getStudioLabel(s)}
          checked={selectedStudios.includes(s)}
          onChange={() => handleStudioSelect(s)}
        />
      ))}
    </div>
  );
}
