import React from "react"
import { useBackgroundClass } from "../hooks/store/background"

// すべてのhooksのインポート
const modules = import.meta.glob("../setup/hooks/*.ts", { eager: true })

export default function App({ children }: { children: React.ReactNode }) {
  const { backgroundClass } = useBackgroundClass()

  // 各モジュールのコードをコンポーネント内で実行
  for (const path in modules) {
      const module = modules[path] as { default?: () => void }
      module.default?.()
  }

  return (
    <div className={backgroundClass}>
      {children}
    </div>
  )
}
