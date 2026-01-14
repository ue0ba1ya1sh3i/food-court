import { useBackgroundStore } from "../hooks/store/background"
import { useEffect } from "react"
import type { BackgroundType } from "../hooks/store/background"

export function useSetup(colorType: BackgroundType) {
  const { setBackground } = useBackgroundStore()

  // 背景の指定
  useEffect(() => {
    setBackground(colorType)
  }, [setBackground, colorType])
}
