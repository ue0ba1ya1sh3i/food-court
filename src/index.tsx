import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ページコンポーネント
import { RootPage } from "@/pages/root"
import { LoginPage } from "@/pages/login"
import { OfflinePage} from "@/pages/offline"
import { AdminPage } from "@/pages/admin"
import { QrPage } from "@/pages/qr"
import { ChargePage } from "@/pages/charge"
import { SetAdminPage } from "@/pages/setAdmin"
import { AdminDashBoardPage } from "@/pages/adminDashboard"

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
          <Route path="/admin/dashboard" element={<AdminDashBoardPage />} />
        </Routes>
      </SetupComponent>
    </BrowserRouter>
  </StrictMode>
)
