import { z } from "zod/v4"

export const loginSchema = z.object({
  email: z.email(),
      // .string()
      // .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, { error: "Невалвидный email" }),
  rememberMe: z.boolean(),
  password: z
    .string()
      .min(1, {error: 'Password is required'})
      .min(3, {error: "Password must be at least 3 characters long" }),
})

export type LoginInputs = z.infer<typeof loginSchema>
