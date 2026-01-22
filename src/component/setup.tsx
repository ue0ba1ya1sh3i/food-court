import React from "react"
import { useBackgroundClass } from "../hooks/store/background"

// セットアップhooks
import { useSetupLogin } from "../setup/hooks/login"
import { useSetupOffline } from "../setup/hooks/offline"

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
