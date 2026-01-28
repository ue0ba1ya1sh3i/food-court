import { httpsCallable } from "firebase/functions"
import { functions } from "@/lib/firebase"

const setAdmin = httpsCallable(functions, "setAdmin")

export { setAdmin }
