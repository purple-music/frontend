import { days, getPresetLabel } from "@/app/[locale]/my/view/_data/presets";

export function PresetSelector({
  day,
  onDaySelect,
}: {
  day: number;
  onDaySelect: (day: number) => void;
}) {
  return (
    <>
      {" "}
      <div className="dropdown dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn btn-outline rounded-btn">
          {getPresetLabel(day)}
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {days.map((d) => (
            <li key={d}>
              <label>
                {getPresetLabel(d)}
                <input
                  className="sr-only"
                  type="radio"
                  name="preset"
                  checked={d === day}
                  onChange={() => onDaySelect(d)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="join hidden md:inline-flex">
        {days.map((d) => (
          <input
            key={d}
            className="btn join-item"
            type="radio"
            name="preset"
            aria-label={getPresetLabel(d)}
            checked={d === day}
            onChange={() => onDaySelect(d)}
          />
        ))}
      </div>
    </>
  );
}
