import { storeName } from "../lib/env"

export default function App() {
  return (
    <div className="text-gray-900 bg-amber-300">
      <div className="min-h-dvh flex flex-col items-center gap-4 justify-center">
        <p className="text-4xl font-bold">{storeName}</p>
        <div className="flex gap-2 text-2xl font-bold">
          <button className="border-b-2 cursor-pointer">ログイン</button>
          <button className="border-b-2 cursor-pointer">チャージ</button>
        </div>
      </div>
    </div>
  )
}
