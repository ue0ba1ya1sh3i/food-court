import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { sendError } from "@/lib"
import { useAuthStore } from "@/hooks/store"
import * as sentry from "@sentry/react"

// ここではhooksとして使わないのでgetState()で通常取得
const { setUser, setAuthLoading } = useAuthStore.getState()

// ログイン・ログアウトするとuserを設定して動的に変わるように
onAuthStateChanged(auth, (user) => {
  setUser(user)

  // ユーザーID別Sentryの監視
  if (user) {
    // メールアドレスがなければエラー
    if (!user.email || !user.uid) {
      sendError(new Error("User information is missing"))
      return
    }

    // ユーザーのセット
    sentry.setUser({
      id: user.uid,
      email: user.email
    })
  } else {
    sentry.setUser(null)
  }

  // ログインが完了したらローディングも消す
  setAuthLoading(false)
})
