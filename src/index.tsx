import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// パスのコンポーネント
import Root from "./pages/root"
import Login from "./pages/login"
import Offline from "./pages/offline"
import Admin from "./pages/admin"
import QrCharge from "./pages/qrCharge"
import Charge from "./pages/charge"
import SetAdmin from "./pages/setAdmin"
import AdminDashboard from "./pages/adminDashboard"

// その他もろもろ
import './css/index.css'
import './setup'
import { Setup } from "./component/setup"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Setup>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/charge" element={<Charge />} />

          {/* ログインしなくても使える */}
          <Route path="/qrCharge" element={<QrCharge />} />
          <Route path="/setAdmin" element={<SetAdmin />} />

          {/* 管理関係 */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Setup>
    </BrowserRouter>
  </StrictMode>
)
