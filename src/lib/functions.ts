import { getFunctions, httpsCallable } from "firebase/functions"

const functions = getFunctions()

const setAdmin = httpsCallable(functions, "setAdmin")

export { setAdmin }
