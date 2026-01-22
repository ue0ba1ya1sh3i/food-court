import { useEffect, useState } from "react"
import { sendLog } from "@/lib"

// BeforeInstallPromptEventは標準だからdeclare
declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
  }
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [canInstall, setCanInstall] = useState(false)

  // beforeinstallpromptイベントをキャッチしてインストール可能状態にする
  useEffect(() => {
    // その前にインストール済みかを確認
    const isInstalled =
     window.matchMedia("(display-mode: standalone)").matches || 
     (window.navigator as any).standalone === true

    if (isInstalled) {
      setCanInstall(false)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setCanInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () =>
      window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      sendLog("PWA installation accepted")
    }

    setDeferredPrompt(null)
    setCanInstall(false)
  }

  return { canInstall, install }
}
