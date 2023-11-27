import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should have atleast 3 characters")
      .max(50, "Name should have atmost 50 character"),
    description: z
      .string()
      .min(30, "Description should have atleast 30 characters")
      .max(500, "Description should have atmost 500 character"),
    price: z
      .number()
      .positive("Product price should be positive")
      .min(1, "Product price should be atleast 1")
      .max(99999, "Product price should be atmost 99999"),
    salePrice: z
      .number()
      .positive("Product sale price should be positive")
      .min(1, "Product sale price should be atleast 1")
      .max(99999, "Product sale price should be atmost 99999"),
    // isOnSale: z.boolean(),
    stock: z
      .number()
      .positive("Product stock should be positive")
      .min(1, "Product stock should be atleast 1")
      .max(1000, "Product stock should be atmost 1000"),
  })
  .refine((data) => data.salePrice < data.price, {
    message: "Sale price cannot be more than regular price",
    path: ["salePrice"],
  });

export type productSchema = z.infer<typeof productSchema>;
