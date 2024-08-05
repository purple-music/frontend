import { z, ZodType } from "zod";

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().max(255).nullable(),
  password: z.string().min(6), // TODO improve zod
});

export const RegisterUser = UserSchema.omit({ id: true });
export const LoginUser = UserSchema.pick({ email: true, password: true });

type ActionErrors<T extends ZodType<any, any, any>> = {
  errors?: z.inferFlattenedErrors<T>["fieldErrors"];
  message?: string;
};

export type RegisterUserErrors = ActionErrors<typeof RegisterUser>;
export type LoginUserErrors = ActionErrors<typeof LoginUser>;
