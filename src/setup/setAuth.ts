import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuthStore } from '../hooks/store/auth'
import * as sentry from "@sentry/react"

const { setUser, setAuthLoading } = useAuthStore.getState()

// ログイン・ログアウトするとuserを設定して動的に変わるように
onAuthStateChanged(auth, (user) => {
  setUser(user)

  // ユーザーID別Sentryの監視
  if (user) {
    sentry.setUser({
      id: user.uid,
      email: user.email ?? undefined,
    })
  } else {
    sentry.setUser(null)
  }

  // これはログインが完了したらローディングも消すということ
  setAuthLoading(false)
})
