import { useAuthStore } from "../hooks/store/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../lib/firebase"
import { signOut } from "firebase/auth"
import { useEffect } from "react"
import { FiLogOut } from "react-icons/fi"

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
    <div className="min-h-dvh flex flex-col items-center gap-4 justify-center bg-red-400 text-gray-100">
      <FiLogOut size={20} onAuxClick={handleLogout} className="cursor-pointer" onClick={handleLogout} />
    </div>
  )
}
