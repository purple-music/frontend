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
