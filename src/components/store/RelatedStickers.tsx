import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StickerCard } from "@/components/store/StickerCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { PublicProduct } from "@/types/catalog";

interface RelatedStickersProps {
  categoryName: string;
  categorySlug: string;
  currentSlug: string;
  products: PublicProduct[] | undefined;
  isLoading: boolean;
}

export function RelatedStickers({
  categoryName,
  categorySlug,
  currentSlug,
  products,
  isLoading,
}: RelatedStickersProps) {
  const related =
    products?.filter((p) => p.slug !== currentSlug).slice(0, 8) ?? [];

  if (!isLoading && related.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-zinc-200 pt-10 sm:mt-14 sm:pt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            More in {categoryName}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Other stickers from the same collection
          </p>
        </div>
        <Link
          to={`/c/${categorySlug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View collection
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {related.map((product) => (
            <StickerCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
