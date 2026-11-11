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
      <Link to={`/s/${product.slug}`} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background" aria-label={`${product.name}, in ${product.category.name}`}>
        <Card className="overflow-hidden rounded-2xl border-[#e4dfd3] bg-[#fffdf7] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:shadow-[0_15px_32px_#29250f15]">
          <div className="checkerboard aspect-square p-3 sm:p-4">
            {imageUrl ? <img src={imageUrl} alt={product.name} className="size-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.04]" loading="lazy" /> : <div className="flex size-full items-center justify-center text-muted-foreground/40"><ImageIcon className="size-10" strokeWidth={1.25} aria-hidden="true" /></div>}
          </div>
          <div className="min-h-[68px] border-t border-[#e7e2d7] px-3 py-2.5 pr-12 sm:px-3.5 sm:py-3">
            <p className="line-clamp-2 text-xs font-semibold leading-5 text-[#272921] transition-colors group-hover:text-primary sm:text-sm">{product.name}</p>
            <p className="mt-0.5 truncate text-[10px] text-[#808177] sm:text-[11px]">{product.category.name}</p>
          </div>
        </Card>
      </Link>
      <button type="button" aria-label={picked ? `Add another ${product.name} to picks` : `Add ${product.name} to picks`} aria-pressed={picked} title={picked ? "Add another to picks" : "Add to picks"} onClick={(event) => { event.preventDefault(); event.stopPropagation(); addPick({ slug: product.slug, name: product.name, imageUrl: product.imageUrl, categoryName: product.category.name, categorySlug: product.category.slug }); }} className={cn("absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full border shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", picked ? "border-primary bg-primary text-white hover:bg-[#172fae]" : "border-[#dcd7cc] bg-[#fffdf7] text-[#33362e] hover:border-primary hover:bg-primary hover:text-white")}>
        {picked ? <Check className="size-3.5" aria-hidden="true" /> : <Plus className="size-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
}
