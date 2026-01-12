import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS・スタートアップ・セットアップコンポーネント
import './css/index.css'
import './setup'
import Setup from "./component/setup"

// コンポーネント
import Root from "./route/root"
import Login from "./route/login"
import Chrome from "./route/chrome"
import Mobile from "./route/mobile"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Setup>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />

          {/* Chrome Bookとそれ以外のトップページ */}
          <Route path="/c" element={<Chrome />} />
          <Route path="/m" element={<Mobile />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Setup>
  </StrictMode>
)
