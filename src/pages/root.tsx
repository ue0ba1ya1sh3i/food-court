import { useSetup } from "@/hooks"
import { MainComponent } from "@/component"
import { useNavigate } from "react-router-dom"

export function RootPage() {
  const navigate = useNavigate()

  useSetup("main", "ホーム")

  return (
    <>
      <MainComponent title="ホーム" footerType="home">
        {/* TODO: UI追加 */}
        <button onClick={() => navigate("/admin")}>Admin</button>
      </MainComponent>
    </>
  )
}
