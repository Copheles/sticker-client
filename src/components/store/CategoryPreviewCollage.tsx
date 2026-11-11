import { ImageIcon } from "lucide-react";
import { resolveMediaUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

interface CategoryPreviewCollageProps {
  previewImageUrls: string[];
  className?: string;
}

function PreviewSlot({
  src,
  className,
  large,
}: {
  src?: string;
  className?: string;
  large?: boolean;
}) {
  const url = src ? resolveMediaUrl(src) : null;

  return (
    <div
      className={cn(
        "checkerboard relative overflow-hidden rounded-md border border-border/60 bg-muted/30",
        large ? "min-h-0 flex-1" : "aspect-square",
        className,
      )}
    >
      {url ? (
        <img
          src={url}
          alt=""
          className="absolute inset-0 size-full object-contain p-1.5"
          loading="lazy"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground/40">
          <ImageIcon className={large ? "size-8" : "size-5"} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

export function CategoryPreviewCollage({
  previewImageUrls,
  className,
}: CategoryPreviewCollageProps) {
  const urls = previewImageUrls.slice(0, 4);
  while (urls.length < 4) urls.push("");

  return (
    <div className={cn("flex aspect-[4/3] gap-1.5 p-2", className)}>
      <PreviewSlot src={urls[0] || undefined} large className="w-[52%]" />
      <div className="flex w-[48%] flex-col gap-1.5">
        <PreviewSlot src={urls[1] || undefined} />
        <PreviewSlot src={urls[2] || undefined} />
        <PreviewSlot src={urls[3] || undefined} />
      </div>
    </div>
  );
}
