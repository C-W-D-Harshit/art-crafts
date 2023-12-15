"use server";

import connectMongoDB from "@/lib/mongo/dbConnect";
import JustSessionChecker from "@/lib/session/JustSessionChecker";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";

export async function createOrder(body: any) {
  // check session first
  const session = await JustSessionChecker();
  if (!session) {
    return {
      status: false,
      message: "Session expired",
    };
  }

  // connect DB
  await connectMongoDB();

  const user = await User.findById(session.user.id);
  user.phoneNumber = body.phoneNumber;
  await user.save();

  const finalData = {
    customer: user._id,
    ...body,
  };
  //   console.log(finalData);
  try {
    const order = await Order.create(finalData);
    for (const product of order.products) {
      // Find and update the product's stock
      await Product.findByIdAndUpdate(
        product.ProductID,
        { $inc: { stock: -product.quantity } },
        { new: true } // Return the updated document
      );
    }
    return {
      success: true,
      message: "Order created successfully",
      orderID: JSON.stringify(order._id),
    };
  } catch (error) {
    return {
      success: false,
      message: "Some error occurred on our end!",
    };
  }
}
