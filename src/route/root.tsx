import { useNavigate } from "react-router-dom"
import { isChromeBook } from "../lib/device"
import { useEffect } from "react"

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    // 判定
    if (isChromeBook()) {
      navigate("/c")
    } else {
      navigate("/m")
    }
  })

  return null
}
