import { StudioId } from "../types";

export const getOneLetterStudioName = (studio: string) =>
  (studio[0] || "?").toUpperCase();

export const getSoftStudioColor = (studio: string) =>
  ({
    blue: "bg-brand-blue-container text-on-brand-blue-container",
    purple: "bg-brand-purple-container text-on-brand-purple-container",
    orange: "bg-brand-orange-container text-on-brand-orange-container",
  })[studio] || "";

export const getStudioColor = (studio: string) =>
  ({
    blue: "bg-brand-blue text-on-brand-blue",
    purple: "bg-brand-purple text-on-brand-purple",
    orange: "bg-brand-orange text-on-brand-orange",
  })[studio] || "";

export const getStudioLabel = (studio: string) => {
  return studio[0] ? `${studio[0].toUpperCase()}${studio.slice(1)}` : "";
};

export type StudioNameSize = "letter" | "three" | "name" | "full";

// TODO: remove other functions
export const getStudioName = (
  studio: string,
  size: StudioNameSize = "name",
) => {
  if (size === "letter") {
    return getOneLetterStudioName(studio);
  } else if (size === "three") {
    return getStudioLabel(studio).slice(0, 3);
  } else if (size === "name") {
    return getStudioLabel(studio);
  } else {
    return `${getStudioLabel(studio)} Studio`;
  }
};

export const getAllStudios = (): StudioId[] => ["blue", "orange", "purple"];
