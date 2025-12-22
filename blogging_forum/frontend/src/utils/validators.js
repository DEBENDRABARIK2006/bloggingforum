// utils/validators.js
import { z } from "zod";

// ✅ Signup validation schema
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters long")
      .max(50, "Name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(7, "Password must be at least 7 characters long")
      .max(20, "Password cannot exceed 20 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords must match",
  });

// ✅ Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});
