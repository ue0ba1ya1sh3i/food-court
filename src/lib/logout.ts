import { signOut } from "firebase/auth"
import { auth } from "./firebase"
import { sendError } from "./sentry"

export async function logout() {
  try {
    await signOut(auth)
  } catch(e) {
    if (e instanceof Error) {
      // そのまま通れ！
      sendError(e)
    } else {
      // 文字列をError型にする
      sendError(new Error(String(e)))
    }
  }
}
