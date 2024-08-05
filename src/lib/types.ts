import { z, ZodType } from "zod";

export type Hour = number;

export type Studio = "blue" | "purple" | "orange";

export type ActionErrors<T extends ZodType<any, any, any>> = {
  errors?: z.inferFlattenedErrors<T>["fieldErrors"];
  message?: string;
};
