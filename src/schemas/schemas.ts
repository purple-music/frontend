import { ActionErrors } from "@/lib/types";
import { z, ZodType } from "zod";

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().max(255).nullable(),
  password: z.string().min(6), // TODO improve zod
});

const BookingSchema = z.object({
  title: z.string().max(255),
  hour: z.number().int().positive(),
  studio: z.string(),
  createdAt: z.date(),
  orderId: z.string().cuid(),
});

const OrderSchema = z.object({
  id: z.string().cuid(),
  payload: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  bookings: BookingSchema.array(),
  userId: z.string().cuid(),
  user: UserSchema,
});

export const LoginSchema = UserSchema.pick({ email: true, password: true });
export type LoginErrors = ActionErrors<typeof LoginSchema>;

export const RegisterSchema = UserSchema.omit({ id: true });
export type RegisterErrors = ActionErrors<typeof RegisterSchema>;
