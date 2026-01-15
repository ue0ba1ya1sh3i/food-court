import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../hooks/store/auth"
import { useEffect } from "react"

export function useSetupLogin() {
  const { user, authLoading } = useAuthStore()
  const navigate = useNavigate()

  // ログインしてないなら/loginに飛ばす
  useEffect(() => {
    if (!user && !authLoading &&navigator.onLine) {
      navigate("/login", { replace: true })
    }
  }, [user, navigate, authLoading])
}
