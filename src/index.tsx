import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// パスのコンポーネント
import Root from "./route/root"
import Login from "./route/login"

// その他もろもろ
import './css/index.css'
import './setup'
import Setup from "./component/setup"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Setup>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Setup>
  </StrictMode>
)
