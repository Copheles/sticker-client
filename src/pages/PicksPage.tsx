import { Link } from "react-router-dom";
import { ImageIcon, Minus, Plus, Trash2 } from "lucide-react";
import { usePicks } from "@/context/PicksContext";
import { resolveMediaUrl } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PicksPage() {
  const { items, totalCount, totalUnits, setQuantity, removePick, clearPicks } =
    usePicks();

  const createdLabel = new Date().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Screenshot-friendly board */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-zinc-950 px-5 py-4 text-white sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            My picks
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Sticker selection
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {totalCount === 0
              ? "No stickers selected yet"
              : `${totalCount} sticker${totalCount === 1 ? "" : "s"} · ${totalUnits} unit${totalUnits === 1 ? "" : "s"}`}
            {" · "}
            {createdLabel}
          </p>
        </div>

        <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3 text-sm text-zinc-600 sm:px-6">
          Screenshot this page, then send the photo to the store owner outside
          this website (Messenger, Viber, etc.).
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-16 text-center sm:px-6">
            <p className="text-sm text-zinc-500">
              Your picks list is empty. Browse stickers and tap{" "}
              <span className="font-medium text-zinc-800">Add to picks</span>.
            </p>
            <Button asChild className="mt-5 h-10">
              <Link to="/">Browse stickers</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {items.map((item, index) => {
              const imageUrl = resolveMediaUrl(item.imageUrl);
              return (
                <li
                  key={item.slug}
                  className="flex gap-3 px-4 py-4 sm:gap-4 sm:px-6"
                >
                  <span className="mt-1 w-5 shrink-0 text-xs font-semibold text-zinc-400">
                    {index + 1}.
                  </span>
                  <div className="checkerboard size-16 shrink-0 overflow-hidden rounded-lg border border-zinc-200 sm:size-20">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        className="size-full object-contain p-1.5"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-zinc-300">
                        <ImageIcon className="size-6" strokeWidth={1.25} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/s/${item.slug}`}
                      className="line-clamp-2 text-sm font-semibold text-zinc-900 hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {item.categoryName || "Sticker"}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center rounded-md border border-zinc-200">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="flex size-8 items-center justify-center text-zinc-600 hover:bg-zinc-50"
                          onClick={() =>
                            setQuantity(item.slug, item.quantity - 1)
                          }
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold tabular-nums text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="flex size-8 items-center justify-center text-zinc-600 hover:bg-zinc-50"
                          onClick={() =>
                            setQuantity(item.slug, item.quantity + 1)
                          }
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePick(item.slug)}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 ? (
          <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-zinc-800">
                Total units:{" "}
                <span className="tabular-nums text-zinc-950">{totalUnits}</span>
              </p>
              <p className="text-xs text-zinc-500">Sticker Store · My picks</p>
            </div>
          </div>
        ) : null}
      </div>

      {items.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Button asChild variant="outline" className="h-10">
            <Link to="/">Keep browsing</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-10 text-zinc-500"
            onClick={() => {
              if (window.confirm("Clear all picks?")) clearPicks();
            }}
          >
            Clear all
          </Button>
        </div>
      ) : null}

      {items.length > 0 ? (
        <Card className="mt-6 border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 print:hidden sm:p-5">
          <p className="font-medium text-zinc-800">How to order</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4">
            <li>Check names and quantities above.</li>
            <li>Take a screenshot of this list.</li>
            <li>Send the photo to the store owner outside this site.</li>
          </ol>
        </Card>
      ) : null}
    </div>
  );
}
