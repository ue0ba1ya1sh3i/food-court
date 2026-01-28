import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Suspense } from "react"

import "@/css/index.css"
import "@/setup"
import { SetupComponent } from "@/component/setup"
import { LoadingComponent } from "@/component"

// ページコンポーネント
import { RootPage } from "@/pages/root"
import { LoginPage } from "@/pages/login"
import { OfflinePage } from "@/pages/offline"
import { ChargePage } from "@/pages/charge"
import { NotfoundPage } from "@/pages/notfound"
import { QrPage } from "@/pages/qr"
import { SetAdminPage } from "@/pages/setAdmin"
import { AdminPage } from "@/pages/admin"
import { AdminDashboardPage } from "@/pages/adminDashboard"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
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
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
