import CategoryHolder from "@/components/holders/CategoryHolder";
import ProductHolder from "@/components/holders/ProductHolder";
import Hero from "@/components/pagers/home/Hero";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-8 py-8">
      <Hero />
      <CategoryHolder />
      <ProductHolder
        title="Featured Products"
        feature="featured"
        link="/featured"
      />
      <ProductHolder
        title="Trending Products"
        feature="trending_products"
        link="/trending"
      />
    </main>
  );
}
