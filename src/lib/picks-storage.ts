import type { PickItem } from "@/types/picks";

export const PICKS_STORAGE_KEY = "sticker-store-picks-v1";

export function readPicksFromStorage(): PickItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PICKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is PickItem => {
        return (
          Boolean(item) &&
          typeof item === "object" &&
          typeof (item as PickItem).slug === "string" &&
          typeof (item as PickItem).name === "string" &&
          typeof (item as PickItem).quantity === "number"
        );
      })
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.min(99, Math.floor(item.quantity) || 1)),
        imageUrl: item.imageUrl ?? null,
        categoryName: item.categoryName ?? "",
        categorySlug: item.categorySlug ?? "",
        addedAt: item.addedAt ?? new Date().toISOString(),
      }));
  } catch {
    return [];
  }
}

export function writePicksToStorage(items: PickItem[]): void {
  localStorage.setItem(PICKS_STORAGE_KEY, JSON.stringify(items));
}
