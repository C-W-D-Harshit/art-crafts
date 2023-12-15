"use server";

import connectMongoDB from "@/lib/mongo/dbConnect";
import QueryMaker from "@/lib/query/QueryMaker";
import Product from "@/models/product";
import ApiFeatures from "@/utils/apiFeatures";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import { redis } from "@/lib/redis/redis";
import { nodeCache } from "@/lib/node-cache/nodeCache";

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
  // let products: any = data ?? null;
  let products: any = null;
  try {
    // first connect to the database
    if (!products) {
      connectMongoDB();

      const features = new ApiFeatures(
        Product.find({
          status: "publish",
        }).select(" -featuredExpiry -createdAt -updatedAt -description"),
        searchParams
      )
        .filter()
        .sort()
        .paginate()
        .search();
      products = await features.query;
      console.log("data fetched from db");
    }
    const rpp = process.env.RPP as any;
    nodeCache.set("products", JSON.stringify(products));
    const totalProducts: number = products.length;
    const totalPages =
      totalProducts === 0 ? 0 : Math.ceil(totalProducts / (rpp || 8));
    const numOfResults = products.length;
    const productsInStore = (
      await Product.find({
        status: "publish",
      })
    ).length;

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

export const deleteProductAction = async (id: string) => {
  // connect cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // connect DB
  await connectMongoDB();

  // create necessary fields
  let product: any = {};
  try {
    product = await Product.findById(id);
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    product = await Product.findByIdAndDelete(id);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (!product) {
    return {
      success: false,
      message: "Product not found!",
    };
  }

  return {
    success: true,
    message: "Product deleted successfully!",
  };
};

export const getProductThroughSlug = async (slug: string) => {
  let data = null;
  if (nodeCache.has("product")) {
    const a: any = nodeCache.get("product");
    data = JSON.parse(a);
    console.log("data fetched from cache");
  }
  let product: any = data ?? null;
  // connect DB

  // find product in DB
  if (!product) {
    await connectMongoDB();
    product = await Product.findOne({
      slug,
      status: "publish",
    });
    console.log("data fetched");
  }

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }
  nodeCache.set("product", JSON.stringify(product));
  return {
    success: true,
    product,
  };
};

export const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  // connect DB
  await connectMongoDB();

  try {
    const product = await Product.findById(id);
    product.status = status;
    await product.save();
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return {
      success: true,
      message: "Status updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error!",
    };
  }
};

export const getProductsByIds = async (productIds: string[]) => {
  try {
    // Connect to the database
    await connectMongoDB();

    // Find products by IDs in the database
    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length === 0) {
      return {
        success: false,
        message: "Products not founsd",
      };
    }

    return {
      success: true,
      products,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
