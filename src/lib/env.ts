// envを簡単・セキュアに使えるようにする
const storeName = import.meta.env.VITE_STORE_NAME
const devMode = import.meta.env.DEV
const isFirebaseEmulator = import.meta.env.VITE_FIREBASE_EMULATOR

export { storeName, devMode, isFirebaseEmulator }
