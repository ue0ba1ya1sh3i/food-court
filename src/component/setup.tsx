import React from "react"
import { useBackgroundClass } from "@/hooks/store/background"

// セットアップhooks
import { useLoginSetup, useOfflineSetup } from "@/setup/hooks"

export function SetupComponent({ children }: { children: React.ReactNode }) {
  const { backgroundClass } = useBackgroundClass()

  // セットアップhooksを実行
  useLoginSetup()
  useOfflineSetup()

  return (
    <div className={`min-h-dvh ${backgroundClass}`}>
      {children}
    </div>
  )
}
