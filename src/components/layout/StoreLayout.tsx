import { Outlet } from "react-router-dom";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreBreadcrumbBar } from "@/components/store/StoreBreadcrumbBar";

export function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="sticky top-0 z-40">
        <StoreBreadcrumbBar />
        <StoreHeader />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Sticker store · Browse only
      </footer>
    </div>
  );
}
