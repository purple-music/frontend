import { z } from "zod";

const PasswordSchema = z.string().min(6);

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().min(3).max(255),
  password: z.string(), // We don't want to break old users if PasswordSchema changes
});

const BookingIdSchema = z.number().positive();

const TimeSlotSchema = z.object({
  title: z.string().max(255),
  hour: z.number().int().positive(),
  studio: z.string(),
  createdAt: z.date(),
  bookingId: BookingIdSchema,
});

const BookingSchema = z.object({
  id: BookingIdSchema,
  payload: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  bookings: TimeSlotSchema.array(),
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

export const MakeBooking = z.object({
  slots: z
    .object({
      startTime: z.string().datetime(),
      endTime: z.string().datetime(),
      studio: StudioIdSchema,
    })
    .array()
    .min(1, "At least one slot must be selected"),
  peopleCount: z.number().int().positive().min(1).max(10),
});

export const GetAvailableSlotsSchema = z.object({
  from: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  to: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});
