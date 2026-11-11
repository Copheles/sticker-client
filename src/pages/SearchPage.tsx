import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { searchPublicProducts } from "@/api/public.api";
import { StickerCard } from "@/components/store/StickerCard";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();
  const searchQuery = useQuery({ queryKey: ["public", "search", q], queryFn: () => searchPublicProducts(q), enabled: q.length > 0 });
  const products = searchQuery.data?.products ?? [];
  const total = searchQuery.data?.total ?? 0;

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
      <header className="mb-8 border-b border-[#ded9cd] pb-7">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#74766d]"><Search className="size-3.5 text-primary" aria-hidden="true" /> The sticker search</p>
        <h1 className="display-serif text-5xl leading-none sm:text-6xl">{q ? <>Looking for <span className="text-primary">“{q}”</span></> : "Find a new favorite."}</h1>
        <p className="mt-3 text-sm text-[#707269]">{q ? searchQuery.isLoading ? "Looking through the collection…" : `${total} ${total === 1 ? "sticker" : "stickers"} found` : <>Try searching from the <Link to="/" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">home page</Link> to see what sticks.</>}</p>
      </header>
      {q && searchQuery.isLoading && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="aspect-square w-full rounded-2xl" />)}</div>}
      {q && !searchQuery.isLoading && products.length === 0 && <div className="rounded-2xl border border-dashed border-[#d7d2c6] bg-[#fffdf7]/70 px-5 py-16 text-center"><Sparkles className="mx-auto size-6 text-primary/70" aria-hidden="true" /><p className="display-serif mt-3 text-3xl">No stickers found. Yet.</p><p className="mt-2 text-sm text-muted-foreground">Try another search. Your next favorite might be spelled differently.</p></div>}
      {products.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{products.map((product) => <StickerCard key={product.slug} product={product} />)}</div>}
    </div>
  );
}
