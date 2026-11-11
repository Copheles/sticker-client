import { Link } from "react-router-dom";
import { ArrowRight, Heart, ImageIcon, Minus, Plus, Sparkles, Trash2 } from "lucide-react";
import { usePicks } from "@/context/PicksContext";
import { resolveMediaUrl } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PicksPage() {
  const { items, totalCount, totalUnits, setQuantity, removePick, clearPicks } = usePicks();
  const createdLabel = new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-7">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#74766d]"><Heart className="size-3.5 text-primary" aria-hidden="true" /> Your little collection</p>
        <h1 className="display-serif text-5xl leading-none sm:text-6xl">My picks<span className="text-primary">.</span></h1>
        <p className="mt-3 text-sm text-[#73756c]">A shortlist of things you&apos;d like to keep close.</p>
      </header>
      <Card className="paper-shadow overflow-hidden rounded-[1.5rem] border-[#e3ded2] bg-[#fffdf7]">
        <div className="border-b border-[#e5e0d5] bg-[#f2eee4] px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-sm font-semibold text-[#2b2d26]">Your sticker shortlist</p><p className="mt-1 text-xs text-[#73756c]">{totalCount === 0 ? "No stickers selected yet" : `${totalCount} ${totalCount === 1 ? "sticker" : "stickers"} · ${totalUnits} ${totalUnits === 1 ? "copy" : "copies"}`} · {createdLabel}</p></div>
            {items.length > 0 && <span className="rounded-full bg-[#f4dc67] px-3 py-1 text-[10px] font-semibold text-[#292713]">{totalUnits} in your collection</span>}
          </div>
        </div>
        <div className="border-b border-[#e5e0d5] bg-[#fffdf7] px-5 py-3 text-xs leading-5 text-[#6e7067] sm:px-7">A handy list for later. When you&apos;re ready, take a screenshot and share it with the store owner.</div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center sm:py-20"><span className="flex size-14 items-center justify-center rounded-full bg-[#f2eee4] text-primary"><Heart className="size-6" aria-hidden="true" /></span><p className="display-serif mt-5 text-3xl">A clean slate.</p><p className="mt-2 max-w-xs text-sm leading-6 text-[#73756c]">Find a sticker that feels like you and tap “Add to my picks.” We&apos;ll keep your favorites right here.</p><Button asChild className="mt-6 h-11 rounded-xl px-5"><Link to="/search">Find your first pick <ArrowRight className="size-4" aria-hidden="true" /></Link></Button></div>
        ) : (
          <ul className="divide-y divide-[#e8e4da]">
            {items.map((item, index) => {
              const imageUrl = resolveMediaUrl(item.imageUrl);
              return <li key={item.slug} className="flex gap-3 px-4 py-4 sm:gap-5 sm:px-7 sm:py-5">
                <span className="mt-1 w-5 shrink-0 text-[10px] font-semibold tabular-nums text-[#888980]">{String(index + 1).padStart(2, "0")}</span>
                <div className="checkerboard size-[68px] shrink-0 overflow-hidden rounded-xl border border-[#ded9cd] sm:size-20">{imageUrl ? <img src={imageUrl} alt={item.name} className="size-full object-contain p-2" /> : <div className="flex size-full items-center justify-center text-muted-foreground/40"><ImageIcon className="size-6" strokeWidth={1.25} aria-hidden="true" /></div>}</div>
                <div className="min-w-0 flex-1"><Link to={`/s/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-[#252720] transition-colors hover:text-primary">{item.name}</Link><p className="mt-1 text-[11px] text-[#777970]">{item.categoryName || "Sticker"}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5"><div className="inline-flex items-center rounded-lg border border-[#ded9cd] bg-background"><button type="button" aria-label={`Decrease ${item.name} quantity`} className="flex size-8 items-center justify-center rounded-l-lg text-[#5e6058] transition-colors hover:bg-[#eee9dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setQuantity(item.slug, item.quantity - 1)}><Minus className="size-3.5" aria-hidden="true" /></button><span className="min-w-8 text-center text-xs font-semibold tabular-nums">{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} className="flex size-8 items-center justify-center rounded-r-lg text-[#5e6058] transition-colors hover:bg-[#eee9dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setQuantity(item.slug, item.quantity + 1)}><Plus className="size-3.5" aria-hidden="true" /></button></div><button type="button" onClick={() => removePick(item.slug)} className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-[11px] font-medium text-[#777970] transition-colors hover:bg-[#f2eee4] hover:text-[#252720] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Trash2 className="size-3.5" aria-hidden="true" /> Remove</button></div>
                </div>
              </li>;
            })}
          </ul>
        )}
        {items.length > 0 && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e0d5] bg-[#f2eee4] px-5 py-4 sm:px-7"><p className="text-sm font-semibold text-[#2b2d26]">Total stickers <span className="ml-1 rounded-full bg-[#f4dc67] px-2.5 py-1 tabular-nums">{totalUnits}</span></p><span className="inline-flex items-center gap-1.5 text-[10px] text-[#777970]"><Sparkles className="size-3 text-primary" aria-hidden="true" /> A good-looking little list</span></div>}
      </Card>
      {items.length > 0 && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden"><Button asChild variant="outline" className="h-10 rounded-xl border-[#d9d5ca] bg-[#fffdf7]"><Link to="/search">Keep browsing</Link></Button><Button type="button" variant="ghost" className="h-10 rounded-xl text-[#777970] hover:text-[#252720]" onClick={() => { if (window.confirm("Clear all picks?")) clearPicks(); }}>Clear all picks</Button></div>}
      {items.length > 0 && <Card className="mt-5 rounded-2xl border-[#e3ded2] bg-[#f2eee4] p-5 text-sm text-[#686a61] print:hidden sm:p-6"><p className="font-semibold text-[#2b2d26]">What&apos;s next?</p><ol className="mt-2 grid gap-2 text-xs leading-5 sm:grid-cols-3"><li><span className="mr-1 font-semibold text-primary">01</span> Check your sticker picks.</li><li><span className="mr-1 font-semibold text-primary">02</span> Save a screenshot of this list.</li><li><span className="mr-1 font-semibold text-primary">03</span> Share it with the store owner.</li></ol></Card>}
    </div>
  );
}
