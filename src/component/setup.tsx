import React from "react"
import { useLoginSetup, useOfflineSetup } from "@/setup/hooks"
import { useBackgroundStore, type BackgroundType } from "@/hooks/store"

const backgroundMap: Record<BackgroundType, string> = {
  theme: "bg-theme-main text-theme-font",
  main: "bg-main-main text-main-font"
}

export function SetupComponent({ children }: { children: React.ReactNode }) {
  const backgroundClass = backgroundMap[useBackgroundStore((s) => s.backgroundType)]

  // セットアップhooksを実行
  useLoginSetup()
  useOfflineSetup()

  return (
    <div className={`min-h-dvh ${backgroundClass}`}>
      {children}
    </div>
  )
}
