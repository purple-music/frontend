import { StudioId } from "../types";


export const getOneLetterStudioName = (studio: StudioId) => studio[0].toUpperCase();

export const getSoftStudioColor = (studio: StudioId) =>
({
    blue: "bg-brand-blue-container",
    purple: "bg-brand-purple-container",
    orange: "bg-brand-orange-container",
})[studio];

export const getStudioColor = (studio: StudioId) =>
({
    blue: "bg-brand-blue",
    purple: "bg-brand-purple",
    orange: "bg-brand-orange",
})[studio];