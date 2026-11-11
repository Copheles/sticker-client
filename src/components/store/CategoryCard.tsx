import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CategoryPreviewCollage } from "@/components/store/CategoryPreviewCollage";
import type { PublicCategory } from "@/types/catalog";

export function CategoryCard({ category }: { category: PublicCategory }) {
  const label =
    category.stickerCount === 1
      ? "1 sticker"
      : `${category.stickerCount} stickers`;

  return (
    <Link to={`/c/${category.slug}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CategoryPreviewCollage previewImageUrls={category.previewImageUrls} />
        <div className="border-t border-border px-3 pb-3 pt-2.5">
          <h3 className="line-clamp-2 text-sm font-bold text-foreground group-hover:text-primary">
            {category.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
        </div>
      </Card>
    </Link>
  );
}
