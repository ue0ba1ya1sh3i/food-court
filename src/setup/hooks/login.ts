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
    const path = url.pathname.split('/')

    // path[1] が最初のパスに
    const isIgnored = ignorePaths.includes(path[1])

    // ログインしてなくて認証ロードが終わり、オフラインでなく、除外パスに含まれてなくれば/loginへリダイレクト
    if (!user && !authLoading && navigator.onLine && !isIgnored) {
      navigate("/login", { replace: true })
    }
  }, [user, authLoading, navigate, location.pathname])
}
