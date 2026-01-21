import { storeName } from "../lib/env"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useAuthStore } from "../hooks/store/auth"
import { useEffect } from "react"
import { useSetup } from "../hooks/setup"
import { sendError } from "../lib/sentry"

export function LoginPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useSetup("theme", "ログイン")
  
  // Googleでログイン
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch(e) {
      if (e instanceof Error) {
        // そのまま通れ！
        sendError(e)
      } else {
        // 文字列をError型にする
        sendError(new Error(String(e)))
      }
    }
  }

  // ログイン済みなら移動
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  return (
    <div className="min-h-dvh flex flex-col items-center gap-4 justify-center">
      <p className="text-4xl font-bold text-center">{storeName}</p>
      <div className="flex gap-4 text-2xl font-bold">
        <button className="border-b-2 cursor-pointer" onClick={handleLogin}>ログイン</button>
        <button className="border-b-2 cursor-pointer" onClick={() => navigate("/qrCharge")}>QRチャージ</button>
      </div>
    </div>
  )
}
