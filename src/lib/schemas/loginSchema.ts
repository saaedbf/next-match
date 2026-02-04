import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "پسورد 6 رقمی" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
