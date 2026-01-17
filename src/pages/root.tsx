import { useSetup } from "../hooks/setup"
import { Main } from "../component/main"
import { useNavigate } from "react-router-dom"

export default function App() {
  const navigate = useNavigate()

  useSetup("main", "ホーム")

  return (
    <>
      <Main title="ホーム" footerType="home">
        <button onClick={() => navigate("/admin")}>Admin</button>
      </Main>
    </>
  )
}
