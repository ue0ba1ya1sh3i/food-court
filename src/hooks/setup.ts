import { useBackgroundStore } from "@/hooks/store/background"
import { useEffect } from "react"
import type { BackgroundType } from "@/hooks/store/background"

export function useSetup(colorType: BackgroundType, title: string) {
  const { setBackground } = useBackgroundStore()

  // タイトルの設定
  useEffect(() => {
    document.title = title
  }, [title])

  // 背景の指定
  useEffect(() => {
    setBackground(colorType)
  }, [setBackground, colorType])
}
