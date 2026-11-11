import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { usePicks } from "@/context/PicksContext";
import { cn } from "@/lib/utils";

export function StoreHeader() {
  const navigate = useNavigate();
  const { totalCount } = usePicks();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-3.5">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md outline-none ring-primary/30 focus-visible:ring-2"
        >
          <Logo className="h-8 w-auto max-w-[100px] object-contain sm:h-9" />
          <span className="hidden text-sm font-semibold tracking-tight text-zinc-900 sm:inline">
            Sticker Store
          </span>
        </Link>

        <form
          onSubmit={onSearchSubmit}
          className="min-w-0 sm:max-w-xl sm:justify-self-center sm:w-full"
        >
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
              strokeWidth={2}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stickers"
              className={cn(
                "h-10 w-full border-zinc-200 bg-zinc-50 pl-9 text-sm shadow-none",
                "placeholder:text-zinc-400",
                "focus-visible:border-zinc-300 focus-visible:bg-white focus-visible:ring-primary/20",
              )}
            />
          </div>
        </form>

        <Link
          to="/picks"
          className={cn(
            "relative inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800 transition-colors",
            "hover:border-zinc-300 hover:bg-zinc-50",
          )}
        >
          <span className="hidden sm:inline">My picks</span>
          <span className="sm:hidden">Picks</span>
          {totalCount > 0 ? (
            <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
              {totalCount > 99 ? "99+" : totalCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
