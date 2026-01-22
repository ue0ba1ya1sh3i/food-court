import { useSetup } from "@/hooks/setup"
import { MainComponent } from "@/component/main"
import { useNavigate } from "react-router-dom"

export function RootPage() {
  const navigate = useNavigate()

  useSetup("main", "ホーム")

  return (
    <>
      <MainComponent title="ホーム" footerType="home">
        <button onClick={() => navigate("/admin")}>Admin</button>
      </MainComponent>
    </>
  )
}
