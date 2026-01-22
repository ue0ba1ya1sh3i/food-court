import { useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "@/hooks/store/auth"
import { useEffect } from "react"

export function useLoginSetup() {
  const { user, authLoading } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 除外パスの設定
    const ignorePaths = ["public"]
    const url = new URL(window.location.href)
    const segments = url.pathname.split('/')

    // segments[1] が最初のパスに
    const isIgnored = ignorePaths.includes(segments[1])

    if (
      !user &&
      !authLoading &&
      navigator.onLine &&
      !isIgnored
    ) {
      navigate("/login", { replace: true })
    }
  }, [user, authLoading, navigate, location.pathname])
}
