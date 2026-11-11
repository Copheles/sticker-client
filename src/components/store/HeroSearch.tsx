import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import studioStickers from "@/assets/sticker-studio.png";

export function HeroSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-10 pt-6 sm:px-7 sm:pb-16 sm:pt-9 lg:px-12 lg:pt-12">
      <div className="relative isolate flex min-h-[520px] overflow-hidden rounded-[1.75rem] border border-[#e7e1d3] bg-[#f1ecdf] shadow-[0_3px_10px_#24220f0c,0_24px_56px_#24220f0b] sm:min-h-[540px] lg:min-h-[570px]">
        <img src={studioStickers} alt="A cheerful assortment of illustrated vinyl stickers" className="absolute inset-0 -z-10 size-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f8f5ec] via-[#f8f5eccf] to-transparent sm:from-[#f8f5ecf2] sm:via-[#f8f5ecb8] sm:to-transparent" />
        <div className="flex w-full flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-16 lg:max-w-[62%] lg:px-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8d1bf] bg-[#fffdf7d9] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#55574d]">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Little things, big personality
          </span>
          <h1 className="display-serif mt-6 max-w-[680px] text-[clamp(3.75rem,8vw,7.2rem)] leading-[0.91] text-[#171916]">
            Make room for <span className="text-primary">a little fun.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#4d5048] sm:text-lg sm:leading-8">
            Your next favorite sticker is hiding in here. Find the little thing that feels like you.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-[#ddd7c9] bg-[#fffdf7] p-1.5 shadow-[0_8px_24px_#1719160b] focus-within:ring-2 focus-within:ring-primary/30">
            <label htmlFor="hero-sticker-search" className="sr-only">Search stickers</label>
            <Input id="hero-sticker-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘flowers’ or ‘good vibes’" className="h-12 border-0 bg-transparent px-3 text-sm shadow-none focus-visible:ring-0 sm:text-base" />
            <Button type="submit" size="icon" aria-label="Search stickers" className="size-12 shrink-0 rounded-xl">
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          </form>
          <a href="#collections" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#3f4239] underline decoration-[#bdb9ad] underline-offset-4 transition-colors hover:text-primary">
            Browse the collections <ArrowDownRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <span className="absolute bottom-5 right-6 hidden rounded-full border border-white/70 bg-[#fffdf7d9] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4f5148] shadow-sm lg:block">Peel. Stick. Repeat.</span>
      </div>
    </section>
  );
}
