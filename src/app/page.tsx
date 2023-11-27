import CategoryHolder from "@/components/holders/CategoryHolder";
import ProductHolder from "@/components/holders/ProductHolder";
import Hero from "@/components/pages/home/Hero";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex flex-col gap-y-8 py-8">
      <Hero />
      <CategoryHolder />
      <ProductHolder
        title="Featured Products"
        feature="featured"
        link="/featured"
        searchParams={{ featured: true }}
      />
      <ProductHolder
        title="New Arrivals"
        feature="trending_products"
        link="/new-arivals"
        searchParams={{ newArrival: true }}
      />
    </main>
  );
}
