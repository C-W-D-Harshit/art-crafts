import { getProducts } from "@/actions/productActions";
import { MetadataRoute } from "next";

export default async function sitemap() {
  const baseUrl = process.env.URL;

  //   const data = await getProducts({ status: "publish" });
  //   console.log(data);

  //   const productsUrls =
  //     data?.products.map((product: any) => {
  //       return {
  //         url: `${baseUrl}/shop/${product.slug}`,
  //         lastModified: new Date(product.updatedAt),
  //       };
  //     }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}
