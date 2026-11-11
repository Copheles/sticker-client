import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { searchPublicProducts } from "@/api/public.api";
import { StickerCard } from "@/components/store/StickerCard";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const searchQuery = useQuery({
    queryKey: ["public", "search", q],
    queryFn: () => searchPublicProducts(q),
    enabled: q.length > 0,
  });

  const products = searchQuery.data?.products ?? [];
  const total = searchQuery.data?.total ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-xl font-bold sm:text-2xl">Search results</h1>
      {q ? (
        <p className="mt-1 text-sm text-muted-foreground">
          {searchQuery.isLoading
            ? "Searching…"
            : `${total} result${total === 1 ? "" : "s"} for “${q}”`}
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Enter a search term from the{" "}
          <Link to="/" className="font-medium text-primary hover:underline">
            home page
          </Link>
          .
        </p>
      )}

      {q && searchQuery.isLoading ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : null}

      {q && !searchQuery.isLoading && products.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No stickers matched your search.
        </p>
      ) : null}

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <StickerCard key={product.slug} product={product} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
