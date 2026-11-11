import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PICKS_STORAGE_KEY,
  readPicksFromStorage,
  writePicksToStorage,
} from "@/lib/picks-storage";
import type { PickItem } from "@/types/picks";

type AddPickInput = Omit<PickItem, "quantity" | "addedAt"> & {
  quantity?: number;
};

interface PicksContextValue {
  items: PickItem[];
  totalCount: number;
  totalUnits: number;
  isInPicks: (slug: string) => boolean;
  addPick: (input: AddPickInput) => void;
  removePick: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearPicks: () => void;
}

const PicksContext = createContext<PicksContextValue | null>(null);

export function PicksProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PickItem[]>(() => readPicksFromStorage());

  useEffect(() => {
    writePicksToStorage(items);
  }, [items]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === PICKS_STORAGE_KEY) {
        setItems(readPicksFromStorage());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addPick = useCallback((input: AddPickInput) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === input.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === input.slug
            ? {
                ...p,
                quantity: Math.min(99, p.quantity + (input.quantity ?? 1)),
                name: input.name,
                imageUrl: input.imageUrl,
                categoryName: input.categoryName,
                categorySlug: input.categorySlug,
              }
            : p,
        );
      }
      return [
        {
          slug: input.slug,
          name: input.name,
          imageUrl: input.imageUrl,
          categoryName: input.categoryName,
          categorySlug: input.categorySlug,
          quantity: Math.max(1, Math.min(99, input.quantity ?? 1)),
          addedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  }, []);

  const removePick = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const next = Math.max(1, Math.min(99, Math.floor(quantity) || 1));
    setItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, quantity: next } : p)),
    );
  }, []);

  const clearPicks = useCallback(() => {
    setItems([]);
  }, []);

  const isInPicks = useCallback(
    (slug: string) => items.some((p) => p.slug === slug),
    [items],
  );

  const totalCount = items.length;
  const totalUnits = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalUnits,
      isInPicks,
      addPick,
      removePick,
      setQuantity,
      clearPicks,
    }),
    [
      items,
      totalCount,
      totalUnits,
      isInPicks,
      addPick,
      removePick,
      setQuantity,
      clearPicks,
    ],
  );

  return (
    <PicksContext.Provider value={value}>{children}</PicksContext.Provider>
  );
}

export function usePicks() {
  const ctx = useContext(PicksContext);
  if (!ctx) {
    throw new Error("usePicks must be used within PicksProvider");
  }
  return ctx;
}
