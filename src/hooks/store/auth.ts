import { create } from 'zustand'
import type { User } from 'firebase/auth'

type Auth = {
  // Firebaseのユーザーの型
  user: User | null
  authLoading: boolean

  // ちゃんとUserの型じゃないといけなくしてる俺すごいでしょ？
  setUser: (user: User | null) => void

  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<Auth>((set) => ({
  // Firebaseのユーザーの型のオブジェクトが入る
  user: null,

  // 初回はローディングをオンにして読み込み中かを判断する
  authLoading: true,

  // セットするための関数
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ authLoading: loading }),
}))
