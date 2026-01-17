import { Main } from "../component/main"
import { Button } from "../component/button"
import { useAuthStore } from "../hooks/store/auth"

async function setAdmin(uid: string) {
  const res = await fetch("/api/setAdmin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ uid }),
  })

  const data = await res.json()

  if (!res.ok) {
    // TODO: ここにダイアログでエラー表示させる
    console.error(data.error)
  }

  return data
}

export default function App() {
  const { user } = useAuthStore()

  return (
    <Main title="管理者権限付与設定" footerType="settings" noMargin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-xl font-bold">このアカウントの管理者権限を付与します</p>
        <Button onClick={() => {
          if (!user) return
          setAdmin(user.uid)
        }}>付与(既に1回付与した場合は失敗します)</Button>
      </div>
    </Main>
  )
}