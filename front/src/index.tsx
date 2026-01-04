import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS&スタートアップ
import './css/index.css'
import './startUp'

// コンポーネント
import Root from "./route/root"
import Introduce from "./route/introduce"
import Charge from "./route/charge"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/charge" element={<Charge />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
