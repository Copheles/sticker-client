import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CategoryPreviewCollage } from "@/components/store/CategoryPreviewCollage";
import type { PublicCategory } from "@/types/catalog";

export function CategoryCard({ category }: { category: PublicCategory }) {
  const label = `${category.stickerCount} ${category.stickerCount === 1 ? "little treasure" : "little treasures"}`;

  return (
    <Link to={`/c/${category.slug}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
      <Card className="overflow-hidden rounded-2xl border-[#e3ded2] bg-[#fffdf7] paper-shadow transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-[0_16px_36px_#29250f18]">
        <CategoryPreviewCollage previewImageUrls={category.previewImageUrls} className="aspect-[1.15/1] gap-2 p-2.5 sm:aspect-[1.2/1] sm:gap-2.5 sm:p-3" />
        <div className="flex items-center justify-between gap-2 border-t border-[#e7e2d7] px-3.5 py-3 sm:px-4 sm:py-3.5">
          <div className="min-w-0"><h3 className="truncate text-[13px] font-semibold text-[#252720] transition-colors group-hover:text-primary sm:text-sm">{category.name}</h3><p className="mt-1 text-[10px] text-[#777970] sm:text-[11px]">{label}</p></div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#ded9cd] bg-background text-[#5d6057] transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
        </div>
      </Card>
    </Link>
  );
}
