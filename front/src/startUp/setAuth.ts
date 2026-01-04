import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuthStore } from '../store/auth'

const { setUser, setLoading } = useAuthStore.getState()

onAuthStateChanged(auth, (user) => {
  setUser(user)
  setLoading(false)
})
