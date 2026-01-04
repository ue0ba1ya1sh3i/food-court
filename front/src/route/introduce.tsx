import { storeName } from "../lib/env"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../lib/firebase"

export default function App() {
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      // Googleでログイン
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)

      // ルートに移管
      navigate("/", { replace: true })
    } catch {
      // TODO 後でエラー処理を書く
    }
  }

  return (
    <div className="text-gray-900 bg-amber-300">
      <div className="min-h-dvh flex flex-col items-center gap-4 justify-center">
        <p className="text-4xl font-bold">{storeName}</p>
        <div className="flex gap-2 text-2xl font-bold">
          <button className="border-b-2 cursor-pointer" onClick={() => handleLogin()}>ログイン</button>
          <button className="border-b-2 cursor-pointer" onClick={() => navigate("/charge")}>チャージ</button>
        </div>
      </div>
    </div>
  )
}
