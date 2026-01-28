import { sendLog } from "@/lib"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export function useOfflineSetup() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOffline = () => {
    if (location.pathname !== "/offline") {
      sendLog("Internet offline")
      navigate("/offline")
    }
  }

  const handleOnline = () => {
    if (location.pathname === "/offline") {
      sendLog("Internet online")
      navigate("/")
    }
  }

  useEffect(() => {
    // 最初からオフラインの場合
    if (!navigator.onLine) {
      handleOffline()
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    // クリーンアップ
    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [navigate, location.pathname])
}
