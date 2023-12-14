import { z } from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(3, "Name should have at least 3 characters")
    .max(30, "Name should have at most 30 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Name is required",
    }),
  email: z.string().refine((value) => value.trim().length > 0, {
    message: "Email is required",
  }),
  phoneNumber: z
    .number()
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
  address: z.string().refine((value) => value.trim().length > 0, {
    message: "Address is required",
  }),
  city: z.string().refine((value) => value.trim().length > 0, {
    message: "City is required",
  }),
  state: z.string().refine((value) => value.trim().length > 0, {
    message: "State is required",
  }),
  postalCode: z
    .number()
    .refine(
      (value) => {
        // Convert the number to a string
        const postalCodeString = String(value);

        // You can add custom validation logic for postal codes here.
        // This is just a placeholder; replace it with your actual validation logic.
        return /^[0-9]{6}$/.test(postalCodeString); // Assuming a 6-digit postal code format
      },
      {
        message: "Invalid postal code format. Use a 6-digit number.",
      }
    )
    .refine((value) => value.toString().trim().length > 0, {
      message: "Postal Code is required",
    }),
});

export type addressSchema = z.infer<typeof addressSchema>;
