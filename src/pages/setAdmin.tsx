import { ButtonComponent, MainComponent } from "@/component"
import { useAuthStore } from "@/hooks/store"
import { sendError, setAdmin } from "@/lib"

export function SetAdminPage() {
  const { user } = useAuthStore()

  // TODO: ここでローディング機能実装
  // TODO: ここで既にsetAdminがtrueなら/に返す

  return (
    <MainComponent title="管理者権限付与設定" footerType="settings" noMargin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-xl font-bold">このアカウントの管理者権限を付与します</p>
        <ButtonComponent onClick={async () => {
          try {
            await setAdmin(user?.uid)

            // TODO: ここにダイアログで成功表示
          } catch(error) {
            // TODO: ここにダイアログでエラー表示
            sendError(error)
          }
        }}>付与(既に1回付与した場合は失敗します)</ButtonComponent>
      </div>
    </MainComponent>
  )
}
