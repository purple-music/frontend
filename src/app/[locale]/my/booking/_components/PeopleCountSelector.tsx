import React from "react";
import { useTranslation } from "react-i18next";

interface PeopleCountSelectorProps {
  peopleCount: number;
  onPeopleCountSelect: (count: number) => void;
  disabled: boolean;
}

export function PeopleCountSelector({
  peopleCount,
  onPeopleCountSelect,
  disabled,
}: PeopleCountSelectorProps) {
  const { t } = useTranslation("my");
  return (
    <fieldset>
      <legend className="mb-4 text-2xl">{t("booking.form.people")}</legend>
      <div className="flex flex-wrap items-center gap-4">
        {[...Array(10).keys()].map((n) => (
          <label
            key={n + 1}
            className={`btn btn-square ${peopleCount === n + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {n + 1}
            <input
              type="radio"
              name="people_count"
              onClick={() => !disabled && onPeopleCountSelect(n + 1)}
              className="sr-only"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default PeopleCountSelector;
