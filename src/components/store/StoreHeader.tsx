import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { usePicks } from "@/context/PicksContext";

export function StoreHeader() {
  const navigate = useNavigate();
  const { totalCount } = usePicks();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="border-b border-[#ded9cd] bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-7 sm:py-4 lg:px-12">
        <Link to="/" className="group flex shrink-0 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Peel Club home">
          <Logo alt="" className="h-11 w-[49px] shrink-0 object-contain mix-blend-multiply transition-transform group-hover:-rotate-2 sm:h-12 sm:w-[53px]" />
        </Link>
        <nav className="hidden items-center gap-6 pl-2 text-[13px] font-medium text-[#575a52] lg:flex" aria-label="Main navigation">
          <Link to="/#collections" className="transition-colors hover:text-primary">Collections</Link>
          <Link to="/search" className="transition-colors hover:text-primary">All stickers</Link>
        </nav>
        <form onSubmit={onSearchSubmit} role="search" className="ml-auto flex min-w-0 max-w-[460px] flex-1 items-center gap-2 rounded-xl border border-[#dfdacf] bg-[#fffdf7] px-3 transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 sm:px-3.5">
          <Search className="size-4 shrink-0 text-[#73766e]" aria-hidden="true" />
          <label htmlFor="header-sticker-search" className="sr-only">Search stickers</label>
          <Input id="header-sticker-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find your thing…" className="h-10 min-w-0 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-[#8a8b83] focus-visible:ring-0" />
          <button type="submit" className="sr-only">Search</button>
        </form>
        <Link to="/picks" aria-label={`My picks${totalCount ? `, ${totalCount} items` : ""}`} className="relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#171916] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary sm:px-4">
          <span className="hidden sm:inline">My picks</span><span className="sm:hidden">Picks</span>
          {totalCount > 0 ? <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#f4dc67] px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#292713]">{totalCount > 99 ? "99+" : totalCount}</span> : null}
        </Link>
      </div>
    </header>
  );
}
