import { MainComponent } from "../component/main"
import { ButtonComponent } from "../component/button"
import { useAuthStore } from "../hooks/store/auth"
import { setAdmin } from "../lib/functions"

export function SetAdminPage() {
  const { user } = useAuthStore()

  return (
    <MainComponent title="管理者権限付与設定" footerType="settings" noMargin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-xl font-bold">このアカウントの管理者権限を付与します</p>
        <ButtonComponent onClick={async () => {
          try {
            await setAdmin(user?.uid)

            // TODO: ここにダイアログで成功表示
            console.log("success")
          } catch(error) {
            // TODO: ここにダイアログでエラー表示
            console.error(error)
          }
        }}>付与(既に1回付与した場合は失敗します)</ButtonComponent>
      </div>
    </MainComponent>
  )
}
