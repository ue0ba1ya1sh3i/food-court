import { useSetup } from "../hooks/setup"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../hooks/store/auth"
import { logout } from "../lib/logout"

export default function App() {
  const { user, authLoading } = useAuthStore()
  const navigate = useNavigate()

  useSetup("main")

  // ログインしてないなら/loginに飛ばす
  useEffect(() => {
    if (!user && !authLoading) {
      navigate("/login", { replace: true })
    }
  }, [user, navigate, authLoading])

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  )
}
