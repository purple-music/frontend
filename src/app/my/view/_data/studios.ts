import { StudioId } from "@/lib/types";

export const studios: StudioId[] = ["purple", "orange", "blue"];

export const getStudioLabel = (studio: StudioId) => {
  const studioNames: Record<StudioId, string> = {
    purple: "Purple",
    orange: "Orange",
    blue: "Blue",
  };

  return studioNames[studio] ?? `${studio}`;
};
