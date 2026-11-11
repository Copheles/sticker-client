import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Check, ExternalLink, Heart, ImageIcon, Plus, Sparkles } from "lucide-react";
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
  const productQuery = useQuery({ queryKey: ["public", "product", slug], queryFn: () => fetchPublicProduct(slug!), enabled: Boolean(slug) });
  const product = productQuery.data;
  const categorySlug = product?.category.slug;
  const alreadyPicked = product ? isInPicks(product.slug) : false;
  const relatedQuery = useQuery({ queryKey: ["public", "products", categorySlug], queryFn: () => fetchPublicProducts({ category: categorySlug }), enabled: Boolean(categorySlug) });
  const imageUrl = product?.imageUrl ? resolveMediaUrl(product.imageUrl) : null;

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
      {productQuery.isLoading ? (
        <div className="grid gap-8 lg:grid-cols-2"><Skeleton className="aspect-square w-full rounded-[1.5rem]" /><Skeleton className="h-80 w-full rounded-[1.5rem]" /></div>
      ) : product ? (
        <>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.8fr)] lg:items-center lg:gap-12">
            <Card className="paper-shadow overflow-hidden rounded-[1.5rem] border-[#e3ded2] bg-[#fffdf7] p-3 sm:p-5">
              <div className="checkerboard flex aspect-square items-center justify-center overflow-hidden rounded-[1rem] p-5 sm:p-8">
                {imageUrl ? <img src={imageUrl} alt={product.name} className="size-full object-contain" /> : <ImageIcon className="size-16 text-muted-foreground/40" strokeWidth={1} aria-hidden="true" />}
              </div>
              {imageUrl && <p className="mt-3 text-center text-[10px] text-[#82837b]">Transparent-background preview · {fileLabelFromUrl(imageUrl)}</p>}
            </Card>

            <div className="flex flex-col items-start gap-6 py-2 lg:py-8">
              <Link to={`/c/${product.category.slug}`} className="inline-flex items-center gap-2 rounded-full border border-[#ded9cd] bg-[#fffdf7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#55584f] transition-colors hover:border-primary/40 hover:text-primary"><Sparkles className="size-3.5 text-primary" aria-hidden="true" />{product.category.name}</Link>
              <div>
                <h1 className="display-serif text-5xl leading-[0.98] sm:text-6xl">{product.name}</h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#65675f] sm:text-base">{product.description || <>A little something from our <Link to={`/c/${product.category.slug}`} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{product.category.name}</Link> collection. Made to brighten up your everyday.</>}</p>
              </div>

              <div className="flex w-full flex-col gap-3 border-y border-[#ded9cd] py-4 text-[12px] sm:flex-row sm:items-center sm:gap-6">
                <span className="inline-flex items-center gap-2 text-[#676960]"><Heart className="size-3.5 text-primary" aria-hidden="true" /> Picked for the little things</span>
                <span className="text-[#85867e]">Image format: {fileLabelFromUrl(imageUrl)}</span>
              </div>

              <div className="flex w-full flex-wrap items-center gap-3">
                <Button type="button" className="h-12 rounded-xl px-5" onClick={() => addPick({ slug: product.slug, name: product.name, imageUrl: product.imageUrl, categoryName: product.category.name, categorySlug: product.category.slug })}>
                  {alreadyPicked ? <><Check className="size-4" aria-hidden="true" /> Added · add another</> : <><Plus className="size-4" aria-hidden="true" /> Add to my picks</>}
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl border-[#d9d5ca] bg-[#fffdf7] px-5"><Link to="/picks">View my picks</Link></Button>
                {imageUrl && <Button asChild variant="ghost" className="h-11 rounded-xl text-[#66685f]"><a href={imageUrl} target="_blank" rel="noopener noreferrer">View image <ExternalLink className="size-3.5" aria-hidden="true" /></a></Button>}
              </div>
              <p className="max-w-md text-[11px] leading-5 text-[#86877f]">Collect a few favorites, then keep them together in your picks. No checkout, just a handy little shortlist.</p>
            </div>
          </div>
          <RelatedStickers categoryName={product.category.name} categorySlug={product.category.slug} currentSlug={product.slug} products={relatedQuery.data?.products} isLoading={relatedQuery.isLoading} />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#d7d2c6] bg-[#fffdf7]/70 px-5 py-16 text-center"><p className="display-serif text-3xl">We couldn&apos;t find that sticker.</p><Link to="/search" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Back to the collection</Link></div>
      )}
    </div>
  );
}
