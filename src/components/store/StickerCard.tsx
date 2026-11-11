import { Link } from "react-router-dom";
import { Check, ImageIcon, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePicks } from "@/context/PicksContext";
import { resolveMediaUrl } from "@/lib/api";
import type { PublicProduct } from "@/types/catalog";
import { cn } from "@/lib/utils";

export function StickerCard({ product }: { product: PublicProduct }) {
  const imageUrl = resolveMediaUrl(product.imageUrl);
  const { addPick, isInPicks } = usePicks();
  const picked = isInPicks(product.slug);

  return (
    <div className="group relative">
      <Link to={`/s/${product.slug}`} className="block">
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
          <div className="checkerboard aspect-square p-3">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="size-full object-contain transition-transform group-hover:scale-[1.02]"
                loading="lazy"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground/40">
                <ImageIcon className="size-10" strokeWidth={1.25} />
              </div>
            )}
          </div>
          <div className="border-t border-border px-3 py-2.5 pr-11">
            <p className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
              {product.name}
            </p>
          </div>
        </Card>
      </Link>

      <button
        type="button"
        aria-label={picked ? "Add another to picks" : "Add to picks"}
        title={picked ? "Add another to picks" : "Add to picks"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addPick({
            slug: product.slug,
            name: product.name,
            imageUrl: product.imageUrl,
            categoryName: product.category.name,
            categorySlug: product.category.slug,
          });
        }}
        className={cn(
          "absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center rounded-full border shadow-sm transition-colors",
          picked
            ? "border-primary/20 bg-primary text-white hover:bg-primary/90"
            : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
        )}
      >
        {picked ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
      </button>
    </div>
  );
}
