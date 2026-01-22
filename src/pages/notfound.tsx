import { useSetup } from "@/hooks"
import { useNavigate } from "react-router-dom"
import { MainComponent, ButtonComponent } from "@/component"

export function NotfoundPage() {
  useSetup("main", "404 - Not Found")
  const navigate = useNavigate()

  return (
    <MainComponent title="404 - Not Found" footerType="home" noMargin={true}>
      <div className="flex flex-col gap-4 items-center text-center p-5 min-h-dvh justify-center">
        <p className="text-3xl font-bold">404 - Not Found</p>
        <p className="text-xl">お探しのページが見つかりませんでした</p>
        <ButtonComponent onClick={() => navigate("/")}>ホームに戻る</ButtonComponent>
      </div>
    </MainComponent>
  )
}
