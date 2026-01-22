import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@/css/index.css"
import "@/setup"
import { SetupComponent } from "@/component"
import { RootPage, LoginPage, OfflinePage, AdminPage, QrPage, ChargePage, SetAdminPage, AdminDashboardPage, NotfoundPage } from "@/pages"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SetupComponent>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/offline" element={<OfflinePage />} />
          <Route path="/charge" element={<ChargePage />} />
          <Route path="*" element={<NotfoundPage />} />

          {/* ログインしなくても使える */}
          <Route path="/public/qr" element={<QrPage />} />

          {/* 秘密 */}
          <Route path="/setAdmin" element={<SetAdminPage />} />

          {/* 管理関係 */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </SetupComponent>
    </BrowserRouter>
  </StrictMode>
)
