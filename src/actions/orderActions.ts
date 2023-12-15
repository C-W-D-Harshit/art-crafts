"use server";

import connectMongoDB from "@/lib/mongo/dbConnect";
import { nodeCache } from "@/lib/node-cache/nodeCache";
import JustSessionChecker from "@/lib/session/JustSessionChecker";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import ApiFeatures from "@/utils/apiFeatures";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/account/orders");
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

export const getOrders = async (searchParams: any) => {
  // check session first
  const session = await JustSessionChecker();
  if (!session) {
    return {
      status: false,
      message: "Session expired",
    };
  }
  // let orders: any = data ?? null;
  let orders: any = null;
  try {
    // first connect to the database
    if (!orders) {
      connectMongoDB();

      const features = new ApiFeatures(
        Order.find({
          customer: session.user.id,
        }),
        searchParams
      )
        .filter()
        .sort()
        .paginate()
        .search();
      orders = await features.query;
      console.log("data fetched from db");
    }
    const rpp = process.env.RPP as any;
    nodeCache.set("orders", JSON.stringify(orders));
    const totalOrders: number = orders.length;
    const totalPages =
      totalOrders === 0 ? 0 : Math.ceil(totalOrders / (rpp || 8));
    const numOfResults = orders.length;
    const ordersInStore = (await Order.find()).length;

    revalidatePath("/account/orders");
    return {
      success: true,
      orders,
      numOfResults,
      totalPages,
      totalOrders,
      ordersInStore,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
