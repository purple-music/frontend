import React from "react";

import { useTranslation } from "@/i18n/server";
import { StudioId } from "@/lib/types";

export type StudioInfo = {
  name: string;
  id: StudioId;
  color: string;
};

interface StudioSelectorProps {
  studios: StudioInfo[];
  selectedStudio: StudioId;
  onStudioSelect: (studioId: StudioId) => void;
  disabled: boolean;
}

export async function StudioSelector({
  studios,
  selectedStudio,
  onStudioSelect,
  disabled,
}: StudioSelectorProps) {
  const { t } = await useTranslation(undefined, "my");
  return (
    <fieldset>
      <legend className="mb-4 text-2xl">{t("booking.form.studio")}</legend>
      <div className="flex flex-wrap gap-4">
        {studios.map((studio) => (
          <label
            key={studio.id}
            className={`card ${studio.color} cursor-pointer text-white shadow-lg ${selectedStudio === studio.id ? "ring ring-primary" : ""}`}
          >
            <div className="card-body">
              <h2 className="card-title text-base-content">{studio.name}</h2>
            </div>
            <input
              type="radio"
              name="selected_studio"
              onClick={() => !disabled && onStudioSelect(studio.id)}
              className="sr-only"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default StudioSelector;
