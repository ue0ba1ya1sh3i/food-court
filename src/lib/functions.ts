import { httpsCallable } from "firebase/functions"
import { functions } from "@/lib"

const setAdmin = httpsCallable(functions, "setAdmin")

export { setAdmin }
