import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(255,45,138,0.12),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-primary">Free transparent stickers</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse stickers
          <span className="block text-primary">added by our store</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Search and explore categories. Every sticker you see here was published from
          the admin catalog.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-xl">
          <div className="relative flex items-center">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stickers..."
              className="h-12 rounded-xl border-border pr-14 text-base shadow-sm sm:h-14 sm:rounded-2xl"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 size-10 rounded-lg sm:right-2 sm:size-11 sm:rounded-xl"
              aria-label="Search"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
