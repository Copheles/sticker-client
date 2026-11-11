import { Navigate, Route, Routes } from "react-router-dom";
import { StoreLayout } from "@/components/layout/StoreLayout";
import { HomePage } from "@/pages/HomePage";
import { CategoryPage } from "@/pages/CategoryPage";
import { SearchPage } from "@/pages/SearchPage";
import { StickerDetailPage } from "@/pages/StickerDetailPage";
import { PicksPage } from "@/pages/PicksPage";

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/c/:slug" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/s/:slug" element={<StickerDetailPage />} />
        <Route path="/picks" element={<PicksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
