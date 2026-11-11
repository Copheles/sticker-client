import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  fetchPublicCategory,
  fetchPublicProducts,
} from "@/api/public.api";
import { StickerCard } from "@/components/store/StickerCard";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const categoryQuery = useQuery({
    queryKey: ["public", "category", slug],
    queryFn: () => fetchPublicCategory(slug!),
    enabled: Boolean(slug),
  });

  const productsQuery = useQuery({
    queryKey: ["public", "products", slug],
    queryFn: () => fetchPublicProducts({ category: slug }),
    enabled: Boolean(slug),
  });

  const category = categoryQuery.data;
  const products = productsQuery.data?.products ?? [];
  const loading = categoryQuery.isLoading || productsQuery.isLoading;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {categoryQuery.isLoading ? (
        <Skeleton className="mb-8 h-20 w-full max-w-lg" />
      ) : category ? (
        <header className="mb-8 max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {category.description}
            </p>
          ) : null}
          <p className="mt-2 text-xs text-muted-foreground">
            {category.stickerCount}{" "}
            {category.stickerCount === 1 ? "sticker" : "stickers"}
          </p>
        </header>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No active stickers in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <StickerCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
