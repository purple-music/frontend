import { z } from "zod";

const PasswordSchema = z.string().min(6);

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().min(3).max(255),
  password: z.string(), // We don't want to break old users if PasswordSchema changes
});

const OrderIdSchema = z.number().positive();

const BookingSchema = z.object({
  title: z.string().max(255),
  hour: z.number().int().positive(),
  studio: z.string(),
  createdAt: z.date(),
  orderId: OrderIdSchema,
});

const OrderSchema = z.object({
  id: OrderIdSchema,
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

const StudioIdSchema = z.enum(["purple", "orange", "blue"]);

export const MakeOrderSchema = z.object({
  slots: z
    .object({
      slotTime: z.date(),
      studio: StudioIdSchema,
    })
    .array()
    .min(1, "At least one slot must be selected"),
  peopleCount: z.number().int().positive().min(1).max(10),
});
