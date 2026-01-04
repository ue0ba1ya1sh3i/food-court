import { useEffect } from "react"
import { useAuthStore } from "../store/auth"
import { useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import { IoIosNotifications, IoMdSettings } from "react-icons/io"

export default function App() {
  const navigate = useNavigate()
  const { user, loading } = useAuthStore()

  // useEffect内でユーザーの判定
  useEffect(() => {
    if (!loading && !user) {
      navigate("/introduce", { replace: true })
    }
  }, [user, loading, navigate])

  // 表示制御
  if (loading || !user) return null

  return (
    <div className="text-gray-900 bg-amber-300 min-h-dvh p-6 font-bold flex flex-col gap-10">
      <div className="fixed top-2 right-2 flex gap-2">
        <IoIosNotifications size={40} className="p-2 cursor-pointer hover:bg-amber-400 rounded-lg transition" />
        <IoMdSettings size={40} className="p-2 cursor-pointer hover:bg-amber-400 rounded-lg transition" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-3xl border-b-4 w-auto pb-2">今月のおすすめメニュー</p>
        <div className="flex gap-4 flex-col sm:flex-row sm:flex-wrap">
          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>

          <button className="cursor-pointer hover:bg-amber-400 p-2 rounded-lg transition-all flex gap-2 items-center">
            <img className="size-15 rounded-lg" src="https://placehold.jp/150x150.png" alt="XXXXのイメージ" />
            <p className="text-2xl">XXXX</p>
          </button>
        </div>

        <button className=" cursor-pointer flex gap-2 mx-auto items-center hover:bg-amber-400 p-2 rounded-lg transition-all">
          <FaArrowRight size={20} />
          <p className="text-2xl">もっとみる</p>
        </button>
      </div>
    </div>
  )
}
