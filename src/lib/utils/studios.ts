import { StudioId } from "../types";

export const getOneLetterStudioName = (studio: StudioId) =>
  studio[0].toUpperCase();

export const getSoftStudioColor = (studio: StudioId) =>
  ({
    blue: "bg-brand-blue-container text-on-brand-blue-container",
    purple: "bg-brand-purple-container text-on-brand-purple-container",
    orange: "bg-brand-orange-container text-on-brand-orange-container",
  })[studio];

export const getStudioColor = (studio: StudioId) =>
  ({
    blue: "bg-brand-blue text-on-brand-blue",
    purple: "bg-brand-purple text-on-brand-purple",
    orange: "bg-brand-orange text-on-brand-orange",
  })[studio];

export const getStudioLabel = (studio: StudioId) => {
  const studioNames: Record<StudioId, string> = {
    purple: "Purple",
    orange: "Orange",
    blue: "Blue",
  };

  return studioNames[studio] ?? `${studio}`;
};

export type StudioNameSize = "letter" | "three" | "name" | "full";

// TODO: remove other functions
export const getStudioName = (
  studio: StudioId,
  size: StudioNameSize = "name",
) => {
  const studioNames: Record<StudioId, string> = {
    purple: "Purple",
    orange: "Orange",
    blue: "Blue",
  };

  if (size === "letter") {
    return studioNames[studio][0].toUpperCase();
  } else if (size === "three") {
    return studioNames[studio].slice(0, 3);
  } else if (size === "name") {
    return studioNames[studio];
  } else {
    return `${studioNames[studio]} Studio`;
  }
};

export const getAllStudios = (): StudioId[] => ["blue", "orange", "purple"];

