import { create } from "zustand"

// 背景テーマ
export type BackgroundType = "normal" | "settings"

// テーマをTailwind CSSに
const backgroundMap: Record<BackgroundType, string> = {
  normal: "bg-red-400 text-gray-100",
  settings: "bg-blue-100 text-gray-900"
}

const useBackgroundStore = create<{
  backgroundType: BackgroundType
  setBackground: (type: BackgroundType) => void
}>((set) => ({
  // 初期値
  backgroundType: "normal",
  setBackground: (type) => set({ backgroundType: type }),
}))

// これは/src/component/setup.tsx用
const useBackgroundClass = function() {
  return {
    backgroundClass: backgroundMap[useBackgroundStore((s) => s.backgroundType)]
  }
}

export { useBackgroundClass, useBackgroundStore}
