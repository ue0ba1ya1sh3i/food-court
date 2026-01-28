import { storeName } from "@/lib/env"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuthStore } from "@/hooks/store/auth"
import { useEffect } from "react"
import { useSetup } from "@/hooks/setup"
import { sendError } from "@/lib"

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
      sendError(e)

      // TODO: ここにダイアログを表示
    }
  }

  // ログイン済みなら移動
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center">
      <div className="gap-4 flex flex-col px-10 rounded-xl bg-theme-sub py-16">
        <p className="text-4xl font-bold text-center">{storeName}</p>
        <div className="flex flex-col gap-4 text-2xl font-bold items-center">
          <button className="border-b-2 cursor-pointer w-max" onClick={handleLogin}>ログイン</button>
          <button className="border-b-2 cursor-pointer w-max" onClick={() => navigate("/public/qr")}>QRチャージ</button>
        </div>
      </div>
    </div>
  )
}
