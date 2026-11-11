import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { fetchPublicCategory, fetchPublicProducts } from "@/api/public.api";
import { StickerCard } from "@/components/store/StickerCard";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryQuery = useQuery({ queryKey: ["public", "category", slug], queryFn: () => fetchPublicCategory(slug!), enabled: Boolean(slug) });
  const productsQuery = useQuery({ queryKey: ["public", "products", slug], queryFn: () => fetchPublicProducts({ category: slug }), enabled: Boolean(slug) });
  const category = categoryQuery.data;
  const products = productsQuery.data?.products ?? [];
  const loading = categoryQuery.isLoading || productsQuery.isLoading;

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
      {categoryQuery.isLoading ? <Skeleton className="mb-9 h-36 w-full max-w-2xl rounded-2xl" /> : category ? (
        <header className="mb-9 border-b border-[#ded9cd] pb-7 sm:mb-10 sm:pb-8">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#74766d]"><Sparkles className="size-3.5 text-primary" aria-hidden="true" /> Find your kind of fun</p>
          <h1 className="display-serif text-5xl leading-[0.98] sm:text-6xl">{category.name}</h1>
          {category.description && <p className="mt-4 max-w-xl text-sm leading-6 text-[#6b6d64] sm:text-base">{category.description}</p>}
          <p className="mt-4 text-[11px] font-medium text-[#777970]">{category.stickerCount} {category.stickerCount === 1 ? "sticker" : "stickers"} to choose from</p>
        </header>
      ) : null}
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="aspect-square w-full rounded-2xl" />)}</div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d7d2c6] bg-[#fffdf7]/70 px-5 py-16 text-center"><p className="display-serif text-3xl">Nothing on this shelf just yet.</p><p className="mt-2 text-sm text-muted-foreground">Pop back soon. We&apos;re always adding new favorites.</p></div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{products.map((product) => <StickerCard key={product.slug} product={product} />)}</div>
      )}
    </div>
  );
}
