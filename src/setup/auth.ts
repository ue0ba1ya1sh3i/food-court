import { onAuthStateChanged } from 'firebase/auth'
import { auth, sendLog } from '@/lib'
import { useAuthStore } from '@/hooks/store'
import * as sentry from "@sentry/react"

// 普通の関数なのでgetState()
const { setUser, setAuthLoading } = useAuthStore.getState()

// ログイン・ログアウトするとuserを設定して動的に変わるように
onAuthStateChanged(auth, (user) => {
  setUser(user)

  // ユーザーID別Sentryの監視
  if (user) {
    sentry.setUser({
      id: user.uid,

      // 絶対あると思うけどね★
      email: user.email || undefined,
    })
    
    sendLog("Now auth status: login")
  } else {
    sendLog("Now auth status: logout")
    sentry.setUser(null)
  }

  // ログインが完了したらローディングも消す
  setAuthLoading(false)
})
