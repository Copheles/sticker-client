import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { fetchPublicCategories } from "@/api/public.api";
import { HeroSearch } from "@/components/store/HeroSearch";
import { CategoryCard } from "@/components/store/CategoryCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const categoriesQuery = useQuery({ queryKey: ["public", "categories"], queryFn: fetchPublicCategories });
  const categories = categoriesQuery.data ?? [];
  const trending = categories.filter((category) => category.stickerCount > 0).slice(0, 8);

  return (
    <>
      <HeroSearch />
      <section id="collections" className="mx-auto max-w-[1440px] scroll-mt-32 px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#ded9cd] pb-5 sm:pb-6">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#75766e]"><Sparkles className="size-3.5 text-primary" aria-hidden="true" /> The good stuff</p>
            <h2 className="display-serif text-4xl leading-none sm:text-5xl">Browse the collections</h2>
            <p className="mt-2.5 text-sm text-[#73756c]">A little something for every side of you.</p>
          </div>
          <Link to="/search" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-[#172fae]">See every sticker <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>

        {trending.length > 0 && <div className="flex flex-wrap gap-2 py-5" aria-label="Popular collections">{trending.map((category) => <Link key={category.slug} to={`/c/${category.slug}`}><Badge variant="outline" className="rounded-full border-[#ded9cd] bg-[#fffdf7] px-3 py-1.5 font-medium text-[#464941] transition-colors hover:border-primary/40 hover:bg-primary hover:text-white">{category.name}</Badge></Link>)}</div>}

        {categoriesQuery.isLoading ? (
          <div className="grid grid-cols-2 gap-3 pt-5 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="aspect-[4/3] w-full rounded-2xl" />)}</div>
        ) : categories.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#d7d2c6] bg-[#fffdf7]/65 px-6 py-16 text-center"><p className="display-serif text-3xl">The shelf is getting ready.</p><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">No collections are available just yet. Check back soon for something worth sticking around for.</p></div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-5 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div>
        )}
      </section>
    </>
  );
}
