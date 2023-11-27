"use server";

import connectMongoDB from "@/lib/mongo/dbConnect";
import QueryMaker from "@/lib/query/QueryMaker";
import Product from "@/models/product";
import ApiFeatures from "@/utils/apiFeatures";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";

export const getAdminProducts = async (searchParams: any) => {
  try {
    // first connect to the database
    connectMongoDB();

    const features = new ApiFeatures(
      Product.find({}).select(
        " -featuredExpiry -createdAt -updatedAt -description"
      ),
      searchParams
    )
      .filter()
      .sort()
      .paginate()
      .search();
    const rpp = process.env.RPP as any;
    const products = await features.query;
    const totalProducts: number = products.length;
    const totalPages =
      totalProducts === 0 ? 0 : Math.ceil(totalProducts / (rpp || 8));
    const numOfResults = products.length;
    const productsInStore = (await Product.find()).length;

    revalidatePath("/admin/products");
    return {
      success: true,
      products,
      numOfResults,
      totalPages,
      totalProducts,
      productsInStore,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export async function createProductAction(body: any) {
  // connect cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // connect DB
  await connectMongoDB();

  // create product
  let product = {};
  try {
    // create img
    const { images } = body;
    if (!images)
      return {
        success: false,
        error: "images are required",
      };

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "trend-hub/products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    body.images = imagesLinks;

    product = await Product.create(body);
    revalidatePath("/admin/products");
    revalidatePath("/shop");
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
  return {
    success: true,
    product,
  };
}

export const validateQuery = (path: string) => {
  revalidatePath(path);
};

export const getProducts = async (searchParams: any) => {
  try {
    // first connect to the database
    connectMongoDB();

    const features = new ApiFeatures(
      Product.find({}).select(
        " -featuredExpiry -createdAt -updatedAt -description"
      ),
      searchParams
    )
      .filter()
      .sort()
      .paginate()
      .search();
    const rpp = process.env.RPP as any;
    const products = await features.query;
    const totalProducts: number = products.length;
    const totalPages =
      totalProducts === 0 ? 0 : Math.ceil(totalProducts / (rpp || 8));
    const numOfResults = products.length;
    const productsInStore = (await Product.find()).length;

    revalidatePath("/shop");
    return {
      success: true,
      products,
      numOfResults,
      totalPages,
      totalProducts,
      productsInStore,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
