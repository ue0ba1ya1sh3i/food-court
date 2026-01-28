import { signOut } from "firebase/auth"
import { sendError, sendLog } from "@/lib"
import { auth } from "@/lib/firebase"

export async function logout() {
  try {
    sendLog("About to logout")
    await signOut(auth)
  } catch(e) {
    sendError(e)

    // 二重エラーになるのでreturnで返す
    return e
  }
}
