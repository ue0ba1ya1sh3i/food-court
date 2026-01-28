import { create } from "zustand"

// テーマの定義
export type BackgroundType = "theme" | "main"

const useBackgroundStore = create<{
  backgroundType: BackgroundType
  setBackground: (type: BackgroundType) => void
}>((set) => ({
  // 初期値
  backgroundType: "main",
  
  setBackground: (type) => set({ backgroundType: type }),
}))

export { useBackgroundStore }
