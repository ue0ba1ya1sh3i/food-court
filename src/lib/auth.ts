import { signOut } from "firebase/auth"
import { auth, sendError } from "@/lib"

export async function logout() {
  try {
    await signOut(auth)
  } catch(e) {
    sendError(e)

    // Sentryにはキャッチしないreturnでエラーを返す！
    return { error: e }
  }
}
