import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootPage, LoginPage, OfflinePage, AdminPage, QrPage, ChargePage, SetAdminPage, AdminDashboardPage } from "@/pages"

// その他もろもろ
import '@/css/index.css'
import '@/setup'
import { SetupComponent } from "@/component/setup"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SetupComponent>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/offline" element={<OfflinePage />} />
          <Route path="/charge" element={<ChargePage />} />

          {/* ログインしなくても使える */}
          <Route path="/public/qr" element={<QrPage />} />

          {/* 管理関係 */}
          <Route path="/setAdmin" element={<SetAdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </SetupComponent>
    </BrowserRouter>
  </StrictMode>
)
