import { useAuthStore } from "../hooks/store/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../lib/firebase"
import { signOut } from "firebase/auth"
import { useEffect } from "react"

export default function App() {
  const navigate = useNavigate()
  const { user, loading } = useAuthStore()

  useEffect(() => {
    // ローディング済みでログインしてないなら飛ばす
    if (!loading && !user) {
      navigate("/login", { replace: true })
    }
  })

  // ローディング中
  if (loading) return null

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login", { replace: true })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <button
      onClick={handleLogout}
      className="px-4 py-2 rounded bg-red-500 text-white"
    >
      ログアウト
    </button>
    </div>
  )
}
