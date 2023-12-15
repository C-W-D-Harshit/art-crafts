import mongoose, { models } from "mongoose";

const { Schema } = mongoose;

// Define a schema for the product included in the order
interface IProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  ProductID: mongoose.Types.ObjectId;
  size: string;
}

// Define a schema for the product included in the order
const productSchema = new Schema<IProduct>({
  ProductID: {
    type: Schema.Types.ObjectId,
    ref: "Product", // Reference to a Customer model (assuming you have one)
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

// Define a schema for the order
interface IOrder extends Document {
  customer: mongoose.Types.ObjectId;
  products: IProduct[];
  orderDate: Date;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentStatus: "pending" | "completed" | "failed";
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: "credit card" | "paypal" | "cash on delivery";
}

// Define a schema for the order
const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to a Customer model (assuming you have one)
      required: true,
    },
    customerPhoneNumber: {
      type: Number,
      required: true,
    },
    products: {
      type: [productSchema], // Array of products in the order
      validate: {
        validator: async function (products: IProduct[]) {
          // Assuming you have a Product model
          const Product = mongoose.model("Product");

          // Check each product in the array
          for (const product of products) {
            // Check if the product exists
            const existingProduct = await Product.findById(product.ProductID);

            if (!existingProduct) {
              return false; // Product does not exist
            }

            // Check if the product's price matches the provided price
            if (existingProduct.price !== product.price) {
              return false; // Incorrect product price
            }

            // Check if there is enough stock
            if (existingProduct.stock < product.quantity) {
              return false; // Insufficient stock
            }
          }

          return true; // All products are valid
        },
        message: "Invalid products or prices or insufficient stock", // Custom error message
      },
    }, // Array of products in the order
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    shippingAddress: {
      address: String,
      city: String,
      state: String,
      postalCode: String,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cod"],
      required: true,
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Virtual property for totalAmount calculation
orderSchema.virtual("totalAmount").get(function (this: any) {
  // 'this.products' contains the array of products
  return this.products.reduce((total: number, product: IProduct) => {
    return total + product.price * product.quantity;
  }, 0);
});

// Ensure virtuals are included in toJSON output
orderSchema.set("toJSON", { virtuals: true });

// // Post-save middleware to reduce stock in products
// orderSchema.post<IOrder>("save", async function (order) {
//   try {
//     const Product = mongoose.model("Product");

//     for (const product of order.products) {
//       // Find and update the product's stock
//       const dg = await Product.findById(product.ProductID);
//       console.log(dg);
//       dg.stock -= product.quantity;
//       await dg.save();
//     }
//   } catch (error) {
//     console.error("Error updating stock:", error);
//   }
// });

// Create an Order model using the schema
const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;
