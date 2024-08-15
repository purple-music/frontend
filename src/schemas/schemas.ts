import { z } from "zod";

const PasswordSchema = z.string().min(6);

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().min(3).max(255),
  password: z.string(), // We don't want to break old users if PasswordSchema changes
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

export const ResetSchema = UserSchema.pick({ email: true });

export const RegisterSchema = UserSchema.omit({ id: true }).extend({
  password: PasswordSchema,
});

export const NewPasswordSchema = z.object({
  password: PasswordSchema,
});
