import { useSetup } from "@/hooks"
import { MainComponent, LoadingComponent } from "@/component"

export function RootPage() {
  useSetup("main", "ホーム")

  return (
    <MainComponent title="ホーム" footerType="home">
      <LoadingComponent />
    </MainComponent>
  )
}
