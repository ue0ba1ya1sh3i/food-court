import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// 初期化
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const functions = getFunctions(app)

// 開発モードならエミュレーターに接続
if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_EMULATOR === "on") {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(firestore, "localhost", 8080)
  connectStorageEmulator(storage, "localhost", 9199)
  connectFunctionsEmulator(functions, "localhost", 5001)
}

export { auth, firestore, storage, functions }
