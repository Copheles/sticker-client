import { Link, Outlet } from "react-router-dom";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreBreadcrumbBar } from "@/components/store/StoreBreadcrumbBar";

export function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="sticky top-0 z-40">
        <div className="flex h-8 items-center justify-center gap-2 bg-[#171916] px-3 text-center text-[10px] font-medium tracking-[0.06em] text-[#f8f5ec] sm:text-[11px]">
          <Sparkles className="size-3 text-[#f4dc67]" aria-hidden="true" /> A little joy, delivered by the sticker.
        </div>
        <StoreHeader />
      </div>
      <StoreBreadcrumbBar />
      <main className="flex-1"><Outlet /></main>
      <footer className="mt-10 border-t border-[#ded9cd] bg-[#f0ece2]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12 lg:py-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-black tracking-[-0.07em] text-[#171916]">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white"><Sparkles className="size-4" aria-hidden="true" /></span>peel<span className="-ml-2 text-primary">club</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#686a61]">A small collection of good things to stick around for.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-[#62645b]">
            <Link to="/search" className="transition-colors hover:text-primary">Browse stickers</Link>
            <Link to="/picks" className="transition-colors hover:text-primary">Your picks</Link>
            <span className="inline-flex items-center gap-1.5 text-[#85867e]"><Heart className="size-3.5" aria-hidden="true" /> Made for the little things <ArrowUpRight className="size-3" aria-hidden="true" /></span>
          </div>
        </div>
        <div className="border-t border-[#ded9cd] px-5 py-3 text-center text-[10px] text-[#777970] sm:px-8">© {new Date().getFullYear()} Peel Club. Browse & collect.</div>
      </footer>
    </div>
  );
}
