import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPublicCategories } from "@/api/public.api";
import { HeroSearch } from "@/components/store/HeroSearch";
import { CategoryCard } from "@/components/store/CategoryCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const categoriesQuery = useQuery({
    queryKey: ["public", "categories"],
    queryFn: fetchPublicCategories,
  });

  const categories = categoriesQuery.data ?? [];
  const trending = categories.filter((c) => c.stickerCount > 0).slice(0, 8);

  return (
    <>
      <HeroSearch />

      {trending.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {trending.map((cat) => (
              <Link key={cat.slug} to={`/c/${cat.slug}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Categories</h2>
            <p className="text-sm text-muted-foreground">
              Pick a collection to view stickers
            </p>
          </div>
        </div>

        {categoriesQuery.isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-xl" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            No categories yet. Add stickers from the admin dashboard.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
