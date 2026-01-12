import { storeName } from "../lib/env"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useAuthStore } from "../hooks/store/auth"
import { useEffect } from "react"
import { useBackgroundStore } from "../hooks/store/background"

export default function App() {
  const navigate = useNavigate()
  const { user, loading } = useAuthStore()
  const { setBackground } = useBackgroundStore()

  useEffect(() => {
    setBackground("normal")
  }, [setBackground])

  const handleLogin = async () => {
    try {
      // Googleでログイン
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // ログイン済みなら移管
    if (user) {
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  // ローディング中
  if (loading) return null

  return (
    <div className="min-h-dvh flex flex-col items-center gap-4 justify-center">
      <p className="text-4xl font-bold">{storeName}</p>
      <div className="flex gap-4 text-2xl font-bold">
        <button className="border-b-2 cursor-pointer" onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  )
}
