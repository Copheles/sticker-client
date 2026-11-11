import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Check, ExternalLink, ImageIcon, Plus } from "lucide-react";
import { fetchPublicProduct, fetchPublicProducts } from "@/api/public.api";
import { resolveMediaUrl } from "@/lib/api";
import { usePicks } from "@/context/PicksContext";
import { RelatedStickers } from "@/components/store/RelatedStickers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function fileLabelFromUrl(url: string | null): string {
  if (!url) return "—";
  if (url.includes(".webp")) return "WebP";
  if (url.includes(".png")) return "PNG";
  if (url.includes(".jpg") || url.includes(".jpeg")) return "JPEG";
  return "Image";
}

export function StickerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addPick, isInPicks } = usePicks();

  const productQuery = useQuery({
    queryKey: ["public", "product", slug],
    queryFn: () => fetchPublicProduct(slug!),
    enabled: Boolean(slug),
  });

  const product = productQuery.data;
  const categorySlug = product?.category.slug;
  const alreadyPicked = product ? isInPicks(product.slug) : false;

  const relatedQuery = useQuery({
    queryKey: ["public", "products", categorySlug],
    queryFn: () => fetchPublicProducts({ category: categorySlug }),
    enabled: Boolean(categorySlug),
  });

  const imageUrl = product?.imageUrl
    ? resolveMediaUrl(product.imageUrl)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {productQuery.isLoading ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      ) : product ? (
        <>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
            <Card className="overflow-hidden border-zinc-200 p-4 shadow-sm sm:p-5">
              <div className="checkerboard aspect-square rounded-lg">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="size-full object-contain p-4 sm:p-6"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-zinc-300">
                    <ImageIcon className="size-16" strokeWidth={1} />
                  </div>
                )}
              </div>
              {imageUrl ? (
                <p className="mt-3 text-center text-xs text-zinc-400">
                  Transparent background preview
                </p>
              ) : null}
            </Card>

            <div className="space-y-6">
              <div>
                <Link
                  to={`/c/${product.category.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
                >
                  {product.category.name}
                </Link>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  {product.name}
                </h1>
                {product.description ? (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                    {product.description}
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500">
                    Part of the{" "}
                    <Link
                      to={`/c/${product.category.slug}`}
                      className="font-medium text-zinc-700 underline-offset-2 hover:text-primary hover:underline"
                    >
                      {product.category.name}
                    </Link>{" "}
                    collection.
                  </p>
                )}
              </div>

              <dl className="divide-y divide-zinc-100 rounded-lg border border-zinc-200 bg-zinc-50/80 text-sm">
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-zinc-500">Collection</dt>
                  <dd className="text-right font-medium text-zinc-900">
                    <Link
                      to={`/c/${product.category.slug}`}
                      className="hover:text-primary hover:underline"
                    >
                      {product.category.name}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-zinc-500">Format</dt>
                  <dd className="font-medium text-zinc-900">
                    {fileLabelFromUrl(imageUrl)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-zinc-500">Use</dt>
                  <dd className="text-right font-medium text-zinc-900">
                    Browse &amp; preview
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  className="h-10"
                  onClick={() =>
                    addPick({
                      slug: product.slug,
                      name: product.name,
                      imageUrl: product.imageUrl,
                      categoryName: product.category.name,
                      categorySlug: product.category.slug,
                    })
                  }
                >
                  {alreadyPicked ? (
                    <>
                      <Check className="size-4" />
                      Added · add again
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" />
                      Add to picks
                    </>
                  )}
                </Button>
                <Button asChild variant="outline" className="h-10">
                  <Link to="/picks">View my picks</Link>
                </Button>
                {imageUrl ? (
                  <Button asChild variant="ghost" className="h-10">
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                      Full image
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <RelatedStickers
            categoryName={product.category.name}
            categorySlug={product.category.slug}
            currentSlug={product.slug}
            products={relatedQuery.data?.products}
            isLoading={relatedQuery.isLoading}
          />
        </>
      ) : (
        <p className="py-16 text-center text-zinc-500">Sticker not found.</p>
      )}
    </div>
  );
}
