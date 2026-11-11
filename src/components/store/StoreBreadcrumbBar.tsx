import { useMemo } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { fetchPublicCategory, fetchPublicProduct } from "@/api/public.api";
import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  to?: string;
};

function CrumbSeparator() {
  return (
    <ChevronRight className="size-3.5 shrink-0 text-zinc-500" aria-hidden />
  );
}

export function StoreBreadcrumbBar() {
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const isCategory = pathname.startsWith("/c/");
  const isProduct = pathname.startsWith("/s/");
  const isSearch = pathname.startsWith("/search");
  const isPicks = pathname === "/picks";
  const searchQ = searchParams.get("q")?.trim() ?? "";

  const categoryQuery = useQuery({
    queryKey: ["public", "category", slug],
    queryFn: () => fetchPublicCategory(slug!),
    enabled: isCategory && Boolean(slug),
  });

  const productQuery = useQuery({
    queryKey: ["public", "product", slug],
    queryFn: () => fetchPublicProduct(slug!),
    enabled: isProduct && Boolean(slug),
  });

  const crumbs = useMemo((): Crumb[] => {
    const home: Crumb = { label: "Home", to: "/" };

    if (pathname === "/") {
      return [{ label: "Home" }];
    }

    if (isPicks) {
      return [home, { label: "My picks" }];
    }

    if (isSearch) {
      const trail: Crumb[] = [home];
      if (searchQ) {
        trail.push({
          label: "Search",
          to: `/search?q=${encodeURIComponent(searchQ)}`,
        });
        trail.push({ label: `“${searchQ}”` });
      } else {
        trail.push({ label: "Search" });
      }
      return trail;
    }

    if (isCategory && slug) {
      return [
        home,
        {
          label: categoryQuery.isLoading
            ? "…"
            : (categoryQuery.data?.name ?? slug),
        },
      ];
    }

    if (isProduct && slug) {
      const trail: Crumb[] = [home];
      const cat = productQuery.data?.category;
      if (cat) {
        trail.push({ label: cat.name, to: `/c/${cat.slug}` });
      }
      trail.push({
        label: productQuery.isLoading
          ? "…"
          : (productQuery.data?.name ?? slug),
      });
      return trail;
    }

    return [home];
  }, [
    pathname,
    isSearch,
    isPicks,
    isCategory,
    isProduct,
    searchQ,
    slug,
    categoryQuery.data?.name,
    categoryQuery.isLoading,
    productQuery.data?.name,
    productQuery.data?.category,
    productQuery.isLoading,
  ]);

  const isLoading =
    (isCategory && categoryQuery.isLoading) ||
    (isProduct && productQuery.isLoading);

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-[#141414] text-zinc-300"
    >
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-2.5 text-sm sm:px-6">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          const showLink = Boolean(crumb.to) && !isLast;

          return (
            <li
              key={`${crumb.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              {index > 0 ? <CrumbSeparator /> : null}
              {showLink ? (
                <Link
                  to={crumb.to!}
                  className="font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    isLast ? "text-white" : "text-zinc-400",
                    isLast && isLoading && "animate-pulse text-zinc-500",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
