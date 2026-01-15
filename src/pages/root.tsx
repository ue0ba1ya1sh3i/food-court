import { useSetup } from "../hooks/setup"
import { Main } from "../component/main"

export default function App() {
  useSetup("main", "ホーム")

  return (
    <>
      <Main title="ホーム" footerType="home">Hello world</Main>
    </>
  )
}
