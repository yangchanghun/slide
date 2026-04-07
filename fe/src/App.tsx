// src/routes/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";

import SlideCreatePage from "./slidepages/SlideCreatePage";
import SlideGroupPage from "./slidepages/SlideGroupPage";
import SlideEditPage from "./slidepages/SlideEditPage";
import SliderPage from "./slidepages/SliderPage";
import { SlidePage } from "./slidepages/SlidePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 기본 */}
      <Route path="/" element={<SlidePage />} />

      <Route path="/slides/create" element={<SlideCreatePage />} />
      <Route path="/slides/:id" element={<SlideGroupPage />} />
      <Route path="/slides/:id/edit" element={<SlideEditPage />} />
      <Route path="/slider/:id" element={<SliderPage />} />
    </Routes>
  );
}
