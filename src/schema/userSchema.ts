import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .refine((value) => value.trim().length > 0, {
      message: "Name is required",
    }),
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .refine((value) => value.trim().length > 0, {
      message: "Email is required",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .refine(
      (value) => {
        // Convert the number to a string
        const phoneNumberString = String(value);

        // You can add custom validation logic for phone numbers here.
        // For example, you can check if the phone number matches a specific format.
        // This is just a placeholder; replace it with your actual validation logic.
        return /^[0-9]{10}$/.test(phoneNumberString); // Assuming a 10-digit phone number format
      },
      {
        message: "Invalid phone number format. Use a 10-digit number.",
      }
    )
    .refine((value) => value.toString().trim().length > 0, {
      message: "Phone Number is required",
    }),
  mealPreference: z.string().optional(),
});

export type UserData = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .refine((value) => value.trim().length > 0, {
      message: "Email is required",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type loginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .refine((value) => value.trim().length > 0, {
        message: "Name is required",
      }),
    email: z
      .string()
      .email({ message: "Invalid email format." })
      .refine((value) => value.trim().length > 0, {
        message: "Email is required",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type signupSchema = z.infer<typeof signupSchema>;

export const verifySchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .refine((value) => value.trim().length > 0, {
      message: "Email is required",
    }),
  verificationCode: z
    .string()
    .min(6, { message: "Verification Code must be of 8 characters." })
    .max(6, { message: "Verification Code must be of 8 characters." }),
});

export type verifySchema = z.infer<typeof verifySchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .refine((value) => value.trim().length > 0, {
      message: "Email is required",
    }),
});

export type forgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type resetPasswordSchema = z.infer<typeof resetPasswordSchema>;
