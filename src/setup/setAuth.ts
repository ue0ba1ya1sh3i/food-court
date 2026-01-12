import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuthStore } from '../hooks/store/auth'

const { setUser, setLoading } = useAuthStore.getState()

// ログイン・ログアウトするとuserを設定して動的に変わるように
onAuthStateChanged(auth, (user) => {
  setUser(user)

  // これはログインが完了したらローディングも消すということ
  setLoading(false)
})
