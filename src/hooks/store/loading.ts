import { create } from "zustand"

export const useLoadingStore = create<{
  isLoading: boolean
  finish: () => void
}>(() => ({
  isLoading: true,
  finish: () => ({ isLoading: false }),
}))
