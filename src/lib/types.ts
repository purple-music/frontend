export type Hour = number;

export type StudioId = "blue" | "purple" | "orange";

export type ActionResult = {
  type: "success" | "error";
  message: string;
};

export type ApiResponse<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: { code: string; message: string } };
