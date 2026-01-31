import { z } from 'zod'
export const SignUpSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })