import { Main } from "../component/main"
import { Button } from "../component/button"
import { useAuthStore } from "../hooks/store/auth"
import { setAdmin } from "../lib/functions"

export default function App() {
  const { user } = useAuthStore()

  return (
    <Main title="管理者権限付与設定" footerType="settings" noMargin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-xl font-bold">このアカウントの管理者権限を付与します</p>
        <Button onClick={async () => {
          try {
            await setAdmin(user?.uid)

            // TODO: ここにダイアログで成功表示
            console.log("success")
          } catch(error) {
            // TODO: ここにダイアログでエラー表示
            console.error(error)
          }
        }}>付与(既に1回付与した場合は失敗します)</Button>
      </div>
    </Main>
  )
}
