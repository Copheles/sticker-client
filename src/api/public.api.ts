import { apiClient } from "@/lib/api";
import type {
  PublicCategory,
  PublicCategoryDetail,
  PublicProduct,
} from "@/types/catalog";

export async function fetchPublicCategories(): Promise<PublicCategory[]> {
  const { data } = await apiClient.get<{ categories: PublicCategory[] }>(
    "/public/categories",
  );
  return data.categories;
}

export async function fetchPublicCategory(
  slug: string,
): Promise<PublicCategoryDetail> {
  const { data } = await apiClient.get<{ category: PublicCategoryDetail }>(
    `/public/categories/${encodeURIComponent(slug)}`,
  );
  return data.category;
}

export async function fetchPublicProducts(params?: {
  category?: string;
  q?: string;
}): Promise<{ total: number; products: PublicProduct[] }> {
  const { data } = await apiClient.get<{
    total: number;
    products: PublicProduct[];
  }>("/public/products", { params });
  return data;
}

export async function fetchPublicProduct(
  slug: string,
): Promise<PublicProduct> {
  const { data } = await apiClient.get<{ product: PublicProduct }>(
    `/public/products/${encodeURIComponent(slug)}`,
  );
  return data.product;
}

export async function searchPublicProducts(
  q: string,
): Promise<{ total: number; products: PublicProduct[] }> {
  const { data } = await apiClient.get<{
    total: number;
    products: PublicProduct[];
  }>("/public/products/search", { params: { q } });
  return data;
}
