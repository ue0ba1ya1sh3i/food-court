import { create } from "zustand"

// 背景テーマ
export type BackgroundType = "theme" | "main"

// テーマをTailwind CSSに
const backgroundMap: Record<BackgroundType, string> = {
  theme: "bg-theme-main text-theme-font",
  main: "bg-main-main text-main-font"
}

const useBackgroundStore = create<{
  backgroundType: BackgroundType
  setBackground: (type: BackgroundType) => void
}>((set) => ({
  // 初期値
  backgroundType: "main",
  setBackground: (type) => set({ backgroundType: type }),
}))

// これは/src/component/setup.tsx用
const useBackgroundClass = function() {
  return {
    backgroundClass: backgroundMap[useBackgroundStore((s) => s.backgroundType)]
  }
}

export { useBackgroundClass, useBackgroundStore}
