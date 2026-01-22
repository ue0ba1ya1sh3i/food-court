import { useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../../hooks/store/auth"
import { useEffect } from "react"

export function useLoginSetup() {
  const { user, authLoading } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 除外パスの設定
    const ignorePaths = ["public"]
    const isIgnored = ignorePaths.some(path =>
      location.pathname.includes(path)
    )

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
