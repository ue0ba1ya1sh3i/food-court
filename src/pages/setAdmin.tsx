import { ButtonComponent, MainComponent, LoadingComponent, DialogComponent } from "@/component"
import { useAuthStore } from "@/hooks/store"
import { sendError, setAdmin } from "@/lib"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SetAdminPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [dialogState, setDialogState] = useState<{
    title: string
    message: string
  } | null>(null)

  return (
    <MainComponent title="管理者権限付与設定" footerType="settings" noMargin={true}>
      <div className="flex flex-col gap-2 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-xl font-bold">このアカウントに管理者権限を付与します</p>
        <ButtonComponent onClick={async () => {
          setIsLoading(true)

          try {
            await setAdmin(user?.uid)
            navigate("/admin/dashboard")
          } catch(error) {
            sendError(error)
            setDialogState({
              title: "エラー",
              message: "設定に失敗しました",
            })
          } finally {
            setIsLoading(false)
          }
        }}>付与する</ButtonComponent>
      </div>

      {isLoading && (
        <LoadingComponent />
      )}

       {dialogState && (
        <DialogComponent title={dialogState.title} close={() => setDialogState(null)}>
          <p className="text-xl">{dialogState.message}</p>
        </DialogComponent>
      )}
    </MainComponent>
  )
}
